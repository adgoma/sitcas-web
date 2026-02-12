import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Encabezado */}
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-500">Contacto</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Canales oficiales
        </h1>
        <p className="mt-3 max-w-3xl text-gray-700">
          Para consultas, coordinación o información institucional, utiliza los
          canales oficiales del sindicato. Priorizamos respuestas claras y
          oportunas.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/afiliacion"
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Afiliación
          </Link>
          <Link
            href="/comunicados"
            className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Ver comunicados
          </Link>
        </div>
      </section>

      {/* Tarjetas */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Correo institucional</h2>
          <p className="mt-2 text-sm text-gray-700">
            Puedes escribirnos al correo oficial del sindicato:
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Email</p>
            <a
              href="mailto:sitcascgr@sitcascgr.com"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              sitcascgr@sitcascgr.com
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Incluye en tu mensaje: asunto claro, nombres completos, DNI y tu
            consulta.
          </p>
        </article>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Horario de atención</h2>
          <p className="mt-2 text-sm text-gray-700">
            Atendemos consultas en horario regular. Las solicitudes fuera de
            horario serán respondidas al siguiente día hábil.
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Horario</p>
            <p className="text-lg font-semibold">
              Lunes a Viernes • 09:00 – 18:00
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            (Este horario puede ajustarse según coordinación interna.)
          </p>
        </article>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">WhatsApp oficial</h2>
          <p className="mt-2 text-sm text-gray-700">
            Puedes escribirnos por WhatsApp para consultas rápidas.
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-600">WhatsApp</p>
            <a
              href="https://wa.me/51967645847"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-semibold text-green-600 hover:underline"
            >
              +51 967 645 847
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Horario sugerido: L–V 09:00–18:00.
          </p>
        </article>
      </section>

      {/* Redes sociales */}
      <section className="mt-10 rounded-2xl border bg-white p-6">
        <h3 className="text-lg font-semibold">Redes sociales oficiales</h3>
        <p className="mt-2 text-sm text-gray-700">
          Síguenos para información institucional, actividades y novedades.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://www.facebook.com/SITCASCGR/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@sitcascgr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            TikTok
          </a>
        </div>
      </section>

      {/* Nota institucional */}
      <section className="mt-10 rounded-2xl border bg-gray-50 p-6">
        <h3 className="text-lg font-semibold">Recomendación</h3>
        <p className="mt-2 text-sm text-gray-700">
          Para solicitudes formales, utiliza siempre los canales oficiales.
          Evita compartir información sensible por medios no autorizados.
        </p>
      </section>
    </main>
  );
}
