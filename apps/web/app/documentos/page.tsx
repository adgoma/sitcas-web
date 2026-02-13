import { wpFetch } from "@/lib/wp";

type WpDocumento = {
  id: number;
  date?: string;
  title: { rendered: string };
  link?: string;
  acf?: {
    documento_sitcas?: number;
    categoria_documento?: string;
    fecha_publicacion?: string;
    descripcion_corta?: string;
  };
};

type WpMedia = {
  id: number;
  source_url: string;
  mime_type?: string;
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

function formatDate(value?: string) {
  if (!value) return "";
  const clean = value.replace(/[^0-9]/g, "");
  if (clean.length === 8) {
    const yyyy = clean.slice(0, 4);
    const mm = clean.slice(4, 6);
    const dd = clean.slice(6, 8);
    return `${dd}/${mm}/${yyyy}`;
  }
  return value;
}

function formatCategory(value?: string) {
  if (!value) return "Otros";
  const parts = value.split(":").map((p) => p.trim());
  const label = parts.length > 1 ? parts[1] : parts[0];
  return label
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

function categoryKey(value?: string) {
  if (!value) return "otros";
  const raw = value.split(":")[0]?.trim().toLowerCase();
  return raw || "otros";
}

function categoryPriority(value?: string) {
  const key = categoryKey(value);
  if (key.startsWith("estatuto")) return 0;
  if (key.startsWith("plan")) return 1;
  return 2;
}

function dateKey(value?: string) {
  if (!value) return 0;
  const clean = value.replace(/[^0-9]/g, "");
  if (clean.length >= 8) {
    return Number(clean.slice(0, 8));
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default async function DocumentosPage() {
  const docs = await wpFetch<WpDocumento[]>(
    "/documentos_sitcas?per_page=100&orderby=date&order=desc"
  );

  const items = Array.isArray(docs) ? docs : [];
  const sortedItems = [...items].sort((a, b) => {
    const pa = categoryPriority(a.acf?.categoria_documento);
    const pb = categoryPriority(b.acf?.categoria_documento);
    if (pa !== pb) return pa - pb;
    const da = dateKey(a.acf?.fecha_publicacion || a.date);
    const db = dateKey(b.acf?.fecha_publicacion || b.date);
    return db - da;
  });

  const mediaIds = Array.from(
    new Set(
      items
        .map((d) => d.acf?.documento_sitcas)
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

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-500">Documentos</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Estatutos, planes y documentos institucionales
        </h1>
        <p className="mt-3 max-w-3xl text-gray-700">
          Aquí encontrarás los documentos de importancia del sindicato. Puedes
          descargarlos directamente para su lectura.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {items.length === 0 ? (
          <div className="rounded-2xl border bg-gray-50 p-6 text-sm text-gray-600">
            Aún no hay documentos publicados.
          </div>
        ) : (
          sortedItems.map((d) => {
            const title = stripHtml(d.title?.rendered || "Documento");
            const desc = stripHtml(d.acf?.descripcion_corta || "");
            const date = formatDate(d.acf?.fecha_publicacion);
            const category = formatCategory(d.acf?.categoria_documento);
            const fileId = d.acf?.documento_sitcas;
            const file = fileId ? mediaById.get(fileId) : undefined;
            const fileUrl = file?.source_url;

            return (
              <article
                key={d.id}
                className="rounded-2xl border bg-white p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-gray-600">
                    {category}
                  </span>
                  {date && (
                    <span className="text-xs text-gray-500">{date}</span>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  {desc && (
                    <p className="mt-2 text-sm text-gray-700">{desc}</p>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  {fileUrl ? (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 btn-primary"
                    >
                      Ver / Descargar
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">
                      Archivo no disponible
                    </span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
