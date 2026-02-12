// apps/web/app/page.tsx
import Link from "next/link";
import HomeSlider from "./components/HomeSlider";
import GalleryGrid from "./components/GalleryGrid";
import { wpFetch } from "@/lib/wp";

type Slide = {
  id: number;
  title: { rendered: string };
  slug: string;
  acf?: {
    subtitulo?: string;
    boton_texto?: string;
    boton_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

type Comunicado = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  link?: string;
};

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

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default async function Home() {
  const slides = await wpFetch<Slide[]>(
    "/slider?_embed&per_page=10&orderby=date&order=asc"
  );

  const comunicados = await wpFetch<Comunicado[]>(
    "/comunicados?per_page=3&orderby=date&order=desc"
  );

  const galerias = await wpFetch<WpGaleria[]>(
    "/galeria?per_page=12&orderby=date&order=desc"
  );

  const latest = Array.isArray(comunicados) ? comunicados : [];
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
    .filter(Boolean)
    .slice(0, 3) as GalleryItem[];

  return (
    <div className="space-y-12">
      <HomeSlider slides={slides} />

      <section className="rounded-3xl border bg-white p-10 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              SITCAS - Sindicato de Trabajadores CAS
            </h1>
            <p className="mt-4 text-gray-700">
              Comunicados oficiales, gestiones del sindicato, información para
              afiliación y canales de contacto.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/comunicados"
                className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Ver comunicados
              </Link>

              <Link
                href="/afiliacion"
                className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold hover:bg-gray-50"
              >
                Afíliate
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="https://www.facebook.com/SITCASCGR/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-4 py-2 hover:bg-gray-50"
              >
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@sitcascgr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-4 py-2 hover:bg-gray-50"
              >
                TikTok
              </a>
              <a
                href="https://wa.me/51967645847"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border px-4 py-2 hover:bg-gray-50"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <div className="text-sm font-semibold text-gray-700">
              Últimos comunicados
            </div>

            <div className="mt-4 space-y-3">
              {latest.length === 0 && (
                <p className="text-sm text-gray-500">
                  Aún no hay comunicados publicados.
                </p>
              )}

              {latest.map((c) => (
                <Link
                  key={c.id}
                  href={`/comunicados/${c.slug}`}
                  className="block rounded-xl border bg-white p-4 hover:shadow-sm"
                >
                  <div className="font-semibold">
                    {stripHtml(c.title?.rendered)}
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    {formatDate(c.date)}
                  </div>

                  <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {stripHtml(c.excerpt?.rendered || "")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-sm font-semibold">Transparencia</div>
          <p className="mt-2 text-sm text-gray-700">
            Publicamos comunicados oficiales y actualizaciones para afiliados.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="text-sm font-semibold">Gestión sindical</div>
          <p className="mt-2 text-sm text-gray-700">
            Orden, trazabilidad y contenido institucional administrado desde el
            CMS.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="text-sm font-semibold">Afiliación</div>
          <p className="mt-2 text-sm text-gray-700">
            Proceso claro y centralizado para nuevos afiliados.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Galería</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">
              Nuestro sindicato en acción
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Momentos de asambleas, capacitaciones y actividades institucionales.
            </p>
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-gray-50 p-6 text-sm text-gray-600">
            Aún no hay fotos publicadas.
          </div>
        ) : (
          <>
            <GalleryGrid items={gallery} />
            <div className="mt-6">
              <Link
                href="/galeria"
                className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-2 text-sm font-semibold hover:bg-gray-50"
              >
                Ver toda la galería
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
