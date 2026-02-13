import AfiliacionAlert from "./AfiliacionAlert";
import AfiliacionForm from "./AfiliacionForm";
import { wpFetch } from "@/lib/wp";
import { Suspense } from "react";

type WpFormato = {
  id: number;
  acf?: {
    formato_afiliacion?: number;
  };
};

type WpMedia = {
  id: number;
  source_url: string;
};

export default async function AfiliacionFormularioPage() {
  let formatoUrl =
    process.env.NEXT_PUBLIC_AFILIACION_FORMATO_URL ||
    "/formatos/formato-afiliacion.docx";

  try {
    const formatos = await wpFetch<WpFormato[]>(
      "/formato_afiliacion?per_page=1&orderby=date&order=desc"
    );
    const item = Array.isArray(formatos) ? formatos[0] : null;
    const mediaId = item?.acf?.formato_afiliacion;
    if (mediaId) {
      const media = await wpFetch<WpMedia>(`/media/${mediaId}`);
      if (media?.source_url) {
        formatoUrl = media.source_url;
      }
    }
  } catch {
    // Si falla, usamos el fallback local/ENV
  }

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      {/* Header */}
      <section className="border rounded-3xl p-8 md:p-12 mb-8">
        <p className="text-sm text-gray-600">Afiliación</p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Formulario de Afiliación
        </h1>

        <p className="mt-4 text-gray-700 max-w-3xl">
          Complete los datos solicitados. Esta información será utilizada
          únicamente para fines de registro sindical y comunicación institucional.
        </p>
      </section>

      <Suspense fallback={null}>
        <AfiliacionAlert />
      </Suspense>

      {/* Formulario + Info */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="order-2 md:order-1">
          <AfiliacionForm formatoUrl={formatoUrl} />
        </div>

        {/* INFO LATERAL */}
        <aside className="order-1 md:order-2 rounded-3xl border border-red-100 bg-red-50/60 p-8 h-fit shadow-lg shadow-red-500/10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Importante
          </div>

          <ul className="mt-4 text-gray-800 text-sm list-disc pl-5 space-y-2">
            <li>Los datos se usan solo para registro y comunicación sindical.</li>
            <li>Verifique que el correo esté correcto para recibir confirmación.</li>
            <li>El DNI debe tener 8 dígitos y el celular 9 dígitos.</li>
            <li>El formato firmado es obligatorio.</li>
          </ul>

          <div className="border border-red-100 rounded-2xl bg-white p-4 mt-6">
            <p className="text-sm font-semibold text-gray-900">Contacto</p>
            <p className="text-sm text-gray-700 mt-1">
              afiliacion@sitcascgr.com
            </p>
            <a
              href="https://wa.me/51967645847"
              className="mt-2 inline-flex text-sm font-semibold text-red-700 hover:opacity-80"
            >
              WhatsApp: +51 967 645 847
            </a>
            <p className="text-sm text-gray-700 mt-1">L–V 09:00–18:00</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
