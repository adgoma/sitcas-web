// apps/web/app/conocenos/[slug]/page.tsx
import Link from "next/link";

const WP_BASE = process.env.WP_BASE_URL ?? "https://sitcascgr.com/cms/index.php";

type WPPost = {
  id: number;
  slug: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    cargo?: string;
    correo?: string;
    linkedin_url?: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

function decodeEntities(s: string) {
  return (s ?? "")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function getMiembroBySlug(slug: string): Promise<WPPost | null> {
  const url =
    `${WP_BASE}/wp-json/wp/v2/directiva` +
    `?slug=${encodeURIComponent(slug)}&_embed&per_page=1`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;

  const arr: WPPost[] = await res.json();
  return arr?.[0] ?? null;
}

export default async function MiembroPage({
  params,
}: {
  params: { slug: string };
}) {
  const m = await getMiembroBySlug(params.slug);

  if (!m) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-600">No se encontró el perfil.</p>
        <Link className="text-blue-700 hover:underline" href="/conocenos">
          ← Volver a Conócenos
        </Link>
      </main>
    );
  }

  const nombre = decodeEntities(m.title?.rendered ?? "Miembro");
  const cargo = m.acf?.cargo;
  const correo = m.acf?.correo;
  const linkedin = m.acf?.linkedin_url;

  const foto = m._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const fotoAlt = m._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || nombre;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link className="text-sm text-blue-700 hover:underline" href="/conocenos">
        ← Volver
      </Link>

      <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
        {foto ? (
          <div className="overflow-hidden rounded-2xl border bg-gray-50">
            <img
              src={foto}
              alt={fotoAlt}
              className="h-[340px] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        ) : null}

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">{nombre}</h1>

        {cargo ? <p className="mt-2 text-gray-700">{cargo}</p> : null}

        {correo ? (
          <div className="mt-4">
            <a className="text-sm text-gray-700 hover:underline" href={`mailto:${correo}`}>
              {correo}
            </a>
          </div>
        ) : null}

        {linkedin ? (
          <div className="mt-6">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Ver perfil profesional
            </a>
          </div>
        ) : null}

        {m.content?.rendered ? (
          <article
            className="prose prose-neutral mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: m.content.rendered }}
          />
        ) : null}
      </div>
    </main>
  );
}
