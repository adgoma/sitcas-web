// apps/web/app/comunicados/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { wpFetch } from "@/lib/wp";

type WPMedia = {
  id: number;
  source_url: string;
  media_type: string;
  mime_type: string;
  title?: { rendered?: string };
};

type WPComunicado = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf?: {
    comunicado_pdf?: number;     // ID de media
    comunicado_imagen?: number;  // ID de media
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function getMediaById(id?: number) {
  if (!id) return null;
  try {
    const m = await wpFetch<WPMedia>(`/media/${id}`);
    return m;
  } catch {
    return null;
  }
}

export default async function ComunicadoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Traemos el comunicado por slug + _embed para featured image
  const arr = await wpFetch<WPComunicado[]>(
    `/comunicados?slug=${encodeURIComponent(slug)}&_embed`
  );

  const post = Array.isArray(arr) && arr.length > 0 ? arr[0] : null;

  if (!post) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/comunicados" className="text-sm text-blue-600 hover:underline">
          ← Volver a comunicados
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Comunicado no encontrado</h1>
      </main>
    );
  }

  // 1) Imagen principal (prioridad: ACF comunicado_imagen, sino featured)
  const acfImage = await getMediaById(post.acf?.comunicado_imagen);
  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  const heroImageUrl = acfImage?.source_url || featured;

  // 2) PDF (si existe)
  const pdfMedia = await getMediaById(post.acf?.comunicado_pdf);
  const pdfUrl =
    pdfMedia?.mime_type === "application/pdf" ? pdfMedia.source_url : null;

  const titulo = decodeEntities(stripHtml(post.title?.rendered || ""));
  const publicado = formatDate(post.date);

  return (
  <main className="max-w-5xl mx-auto px-6 py-10">
    {/* Top bar */}
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/comunicados"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Volver a comunicados
      </Link>
      <div className="text-xs text-gray-500">
        Publicado: {publicado}
      </div>
    </div>

    <section className="mt-6 rounded-3xl border bg-white p-6 sm:p-10 shadow-sm">
      {/* TÍTULO (una sola vez) */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        {titulo}
      </h1>

      {/* BOTONES PDF */}
      {pdfUrl && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white hover:opacity-90 btn-primary"
                >
                  Ver PDF →
                </a>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center justify-center rounded-xl border bg-white px-5 py-3 text-sm font-semibold hover:bg-gray-50"
          >
            Descargar
          </a>
        </div>
      )}

      {/* IMAGEN DEL COMUNICADO (si existe) */}
      {acfImage?.source_url && (
        <div className="mt-8">
          <a
            href={acfImage.source_url}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <div className="overflow-hidden rounded-2xl border bg-gray-50 p-4">
              <img
                src={acfImage.source_url}
                alt={titulo}
                className="mx-auto max-h-[800px] w-auto"
              />
              <div className="mt-3 text-xs text-gray-500 text-center">
                Clic para ver en tamaño completo
              </div>
            </div>
          </a>
        </div>
      )}

      {/* CONTENIDO HTML */}
      <article className="prose prose-neutral max-w-none mt-8">
        <div
          dangerouslySetInnerHTML={{
            __html: post.content?.rendered || "",
          }}
        />
      </article>

      {/* VISOR PDF OPCIONAL */}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-[75vh] rounded-2xl border mt-10"
          title="PDF"
        />
      )}

      {/* CTA */}
      <div className="mt-10 rounded-2xl border bg-gray-50 p-6">
        <div className="text-sm font-semibold">
          ¿Deseas afiliarte?
        </div>
        <p className="mt-2 text-sm text-gray-700">
          Fortalece tu representación sindical y mantente informado con comunicados oficiales.
        </p>
            <Link
              href="/afiliacion"
              className="mt-4 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white hover:opacity-90 btn-primary"
            >
              Ir a afiliación →
            </Link>
      </div>
    </section>
  </main>
);
}
