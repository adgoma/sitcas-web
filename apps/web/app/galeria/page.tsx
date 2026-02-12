// apps/web/app/galeria/page.tsx
import Link from "next/link";
import GalleryGrid from "../components/GalleryGrid";
import { wpFetch } from "@/lib/wp";

type WpGaleria = {
  id: number;
  title: { rendered: string };
  content?: { rendered: string };
  link?: string;
  acf?: {
    foto_galeria?: number;
  };
};

type WpMedia = {
  id: number;
  media_type: string;
  mime_type: string;
  source_url: string;
  alt_text?: string;
  title?: { rendered?: string };
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
};

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  thumb: string;
  full: string;
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

export default async function GaleriaPage() {
  const galerias = await wpFetch<WpGaleria[]>(
    "/galeria?per_page=100&orderby=date&order=desc"
  );

  const galeriaItems = Array.isArray(galerias) ? galerias : [];

  const mediaIds = Array.from(
    new Set(
      galeriaItems
        .map((g) => g.acf?.foto_galeria)
        .filter((id): id is number => typeof id === "number" && id > 0)
    )
  );

  let mediaById = new Map<number, WpMedia>();
  if (mediaIds.length > 0) {
    const media = await wpFetch<WpMedia[]>(
      `/media?include=${mediaIds.join(",")}&per_page=${mediaIds.length}`
    );
    if (Array.isArray(media)) {
      mediaById = new Map(media.map((m) => [m.id, m]));
    }
  }

  const gallery: GalleryItem[] = galeriaItems
    .map((g) => {
      const mediaId = g.acf?.foto_galeria;
      const media = mediaId ? mediaById.get(mediaId) : undefined;
      if (!media || media.media_type !== "image") return null;

      const thumb =
        media.media_details?.sizes?.medium_large?.source_url ||
        media.media_details?.sizes?.large?.source_url ||
        media.source_url;

      return {
        id: g.id,
        title: stripHtml(g.title?.rendered || "Foto"),
        description: stripHtml(g.content?.rendered || ""),
        thumb,
        full: media.source_url,
      };
    })
    .filter(Boolean) as GalleryItem[];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Galería</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Todas las fotos
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Encuentra todas las actividades y momentos del sindicato.
          </p>
        </div>

        <Link
          href="/"
          className="hidden md:inline-flex rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          Volver al inicio
        </Link>
      </div>

      {gallery.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-gray-50 p-6 text-sm text-gray-600">
          Aún no hay fotos publicadas.
        </div>
      ) : (
        <GalleryGrid items={gallery} />
      )}

      <div className="mt-8 md:hidden">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
