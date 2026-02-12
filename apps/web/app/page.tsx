// apps/web/app/page.tsx
import Link from "next/link";
import HomeSlider from "./components/HomeSlider";
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
  // ✅ Slides (WP CPT: slider)
  const slides = await wpFetch<Slide[]>(
    "/slider?_embed&per_page=10&orderby=date&order=asc"
  );

  // ✅ Últimos comunicados (WP CPT: comunicados)
  const comunicados = await wpFetch<Comunicado[]>(
    "/comunicados?per_page=3&orderby=date&order=desc"
  );

  const latest = Array.isArray(comunicados) ? comunicados : [];

  return (
    <div className="space-y-12">
      {/* SLIDER (WP) */}
      <HomeSlider slides={slides} />

      {/* HERO + ÚLTIMOS */}
      <section className="rounded-3xl border bg-white p-10 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              SITCAS — Sindicato de Trabajadores CAS
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

      {/* BLOQUES */}
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
    </div>
  );
}
