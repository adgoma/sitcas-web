// apps/web/app/conocenos/page.tsx
import Link from "next/link";

type WPText = { rendered: string };

type WPMedia = {
  id: number;
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url: string }>;
  };
};

type DirectivaItem = {
  id: number;
  slug: string;
  title: WPText;
  content: WPText;
  acf?: {
    linkedin_url?: string;
    cargo?: string;
    correo?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
};

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function recortarTexto(texto: string, max = 170) {
  if (texto.length <= max) return texto;
  return texto.slice(0, max).trimEnd() + "…";
}

// Tu WP REST funciona con index.php, así que mantenemos esa ruta
const WP_BASE = "https://sitcascgr.com/cms/index.php/wp-json/wp/v2";

async function getDirectiva(): Promise<DirectivaItem[]> {
  const url = `${WP_BASE}/directiva?_embed&per_page=100&orderby=date&order=asc`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo obtener la directiva desde WordPress");

  return res.json();
}

export default async function ConocenosPage() {
  const miembros = await getDirectiva();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="mb-10">
        <p className="text-sm text-gray-500">SITCAS • Sindicato CAS</p>
        <h1 className="text-4xl font-bold tracking-tight mt-2">Conócenos</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Directiva y equipo. Información administrable desde el CMS.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/comunicados"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Ver comunicados
          </Link>
          <Link
            href="/afiliacion"
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Afíliate
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {miembros.map((m) => {
          const nombre = stripHtml(m.title?.rendered ?? "Sin nombre");
          const cargo = m.acf?.cargo?.trim() || "—";
          const correo = m.acf?.correo?.trim();
          const linkedin = m.acf?.linkedin_url?.trim();

          const bio = stripHtml(m.content?.rendered ?? "");
          const descripcion = bio ? recortarTexto(bio, 170) : "";

          const fm = m._embedded?.["wp:featuredmedia"]?.[0];
          // Si quieres, puedes usar thumbnail/medium del JSON (mejor performance):
          const foto =
            fm?.media_details?.sizes?.medium?.source_url ||
            fm?.media_details?.sizes?.thumbnail?.source_url ||
            fm?.source_url ||
            "";

          return (
            <article
              key={m.id}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow transition"
            >
              {/* Foto */}
              <div className="relative w-full aspect-[5/5] overflow-hidden rounded-2xl">
                {foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={foto}
                    alt={nombre}
                    //fill="true"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="h-56 w-full flex items-button justify-button text-sm text-gray-500">
                    Sin foto
                  </div>
                )}
              </div>

              {/* Nombre / Cargo / Correo */}
              <h2 className="mt-4 text-lg font-semibold leading-snug">{nombre}</h2>

              <p className="mt-1 text-sm text-gray-600">{cargo}</p>

              {correo ? (
                <a
                  href={`mailto:${correo}`}
                  className="mt-2 block text-sm text-gray-700 hover:underline"
                >
                  {correo}
                </a>
              ) : (
                <p className="mt-2 text-sm text-gray-400">—</p>
              )}

              {/* Descripción corta (opcional, se ve pro) */}
              {descripcion ? (
                <p className="mt-4 text-sm text-gray-700 leading-relaxed text-justify">
                  {descripcion}
                </p>
              ) : null}

              {/* LinkedIn */}
              <div className="mt-5">
                {linkedin ? (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Ver perfil profesional →
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">
                    Perfil profesional no disponible
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Bloque institucional */}
      <section className="mt-10 rounded-2xl border p-6 bg-gray-50">
        <h3 className="text-lg font-semibold">Nuestro compromiso</h3>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Promovemos una gestión responsable, enfocada en la defensa de derechos
          laborales, el diálogo institucional y el fortalecimiento organizativo,
          manteniendo canales de comunicación claros y oportunos con los afiliados.
        </p>
      </section>
    </main>
  );
}
