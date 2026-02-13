// apps/web/app/comunicados/page.tsx
import Link from "next/link";
import { wpFetch } from "@/lib/wp";

type Comunicado = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
    }>;
  };
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

function clamp(text: string, max = 170) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export default async function ComunicadosPage() {
  const comunicados = await wpFetch<Comunicado[]>(
    "/comunicados?_embed&per_page=30&orderby=date&order=desc"
  );

  const items = Array.isArray(comunicados) ? comunicados : [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header institucional */}
      <section className="mb-10">
        <p className="text-sm text-gray-500">SITCAS • Comunicaciones</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Comunicados</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Comunicados oficiales del sindicato. Aquí encontrarás información
          institucional, anuncios y comunicados dirigidos a afiliados y público
          en general.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/afiliacion"
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium hover:opacity-90 btn-primary"
          >
            Afíliate
          </Link>
          <Link
            href="/conocenos"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Conócenos
          </Link>
        </div>
      </section>

      {/* Grid elegante */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <div className="rounded-2xl border bg-gray-50 p-8 text-gray-700">
            Aún no hay comunicados publicados.
          </div>
        ) : (
          items.map((c) => {
            const titleRaw = c.title?.rendered || "Comunicado";
            const title = decodeEntities(stripHtml(titleRaw));

            const fm = c._embedded?.["wp:featuredmedia"]?.[0];
            const img =
              fm?.media_details?.sizes?.medium_large?.source_url ||
              fm?.media_details?.sizes?.large?.source_url ||
              fm?.source_url ||
              "";

            const alt = decodeEntities(fm?.alt_text || title);

            const excerptRaw =
              c.excerpt?.rendered || c.content?.rendered || "";
            const excerpt = clamp(decodeEntities(stripHtml(excerptRaw)), 170);

            return (
              <article
                key={c.id}
                className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {img ? (
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={alt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  // Header compacto para comunicados sin imagen
                  <div className="px-6 pt-6">
                    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-gray-600">
                      Comunicado
                    </span>
                  </div>
                )}

                {/* Contenido */}
                <div className={img ? "p-6" : "px-6 pb-6 pt-4"}>
                  <div className="text-xs text-gray-500">
                    Publicado: {formatDate(c.date)}
                  </div>

                  <h2 className="mt-2 text-xl font-semibold leading-snug">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <Link
                      href={`/comunicados/${c.slug}`}
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Leer comunicado →
                    </Link>

                    <span className="text-xs text-gray-400">SITCAS</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
