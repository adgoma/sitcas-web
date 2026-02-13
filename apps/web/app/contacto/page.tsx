import Link from "next/link";

const IconFacebook = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3.1-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 2.9h-1.8v7A10 10 0 0 0 22 12Z" />
  </svg>
);

const IconTikTok = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M18.5 5.2c-1-.6-1.8-1.6-2-2.8H13v10.2a2.6 2.6 0 1 1-2.3-2.6v-3a5.6 5.6 0 1 0 5.9 5.6V9.7c1.1.8 2.5 1.2 3.9 1.2V8.2c-.7 0-1.4-.2-2-.6Z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 0 14 6.9 6.9 0 0 1-3.3-.8l-.4-.2-2.6.7.7-2.5-.2-.4A7 7 0 0 1 12 5Zm3.9 10.2c-.2.6-1 1.1-1.6 1.2-.4.1-.8.1-1.4 0-1-.2-2.2-.8-3.4-2-1.2-1.2-1.9-2.5-2.1-3.4-.1-.6-.1-1 0-1.4.1-.6.6-1.4 1.2-1.6.2-.1.4-.1.6 0l.4.2c.1.1.2.2.3.4l.6 1.4c.1.2.1.4 0 .6l-.3.6c-.1.2-.2.4 0 .7.3.5.8 1.2 1.5 1.9.7.7 1.4 1.2 1.9 1.5.3.2.5.1.7 0l.6-.3c.2-.1.4-.1.6 0l1.4.6c.2.1.3.2.4.3l.2.4c.1.2.1.4 0 .6Z" />
  </svg>
);

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
            className="rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 btn-primary"
          >
            Afiliación
          </Link>
          <Link
            href="/comunicados"
            className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 btn-secondary"
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
              className="text-lg font-semibold text-green-600 hover:underline inline-flex items-center gap-2"
            >
              <IconWhatsApp />
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
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            aria-label="Facebook SITCAS"
          >
            <IconFacebook />
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@sitcascgr"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            aria-label="TikTok SITCAS"
          >
            <IconTikTok />
            TikTok
          </a>
          <a
            href="https://wa.me/51967645847"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            aria-label="WhatsApp SITCAS"
          >
            <IconWhatsApp />
            WhatsApp
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
