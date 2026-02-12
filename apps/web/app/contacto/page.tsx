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
          Para consultas, coordinación o información institucional, utiliza los canales oficiales
          del sindicato. Priorizamos respuestas claras y oportunas.
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
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Correo institucional</h2>
          <p className="mt-2 text-sm text-gray-700">
            Puedes escribirnos al correo oficial del sindicato:
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Email</p>
            <a
              href="mailto:sitcascgr@gmail.com"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              sitcascgr@gmail.com
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Incluye en tu mensaje: asunto claro, nombres completos, DNI y tu consulta.
          </p>
        </article>

        <article className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">Horario de atención</h2>
          <p className="mt-2 text-sm text-gray-700">
            Atendemos consultas en horario regular. Las solicitudes fuera de horario serán
            respondidas al siguiente día hábil.
          </p>

          <div className="mt-4 rounded-xl border bg-gray-50 p-4">
            <p className="text-sm text-gray-600">Horario</p>
            <p className="text-lg font-semibold">Lunes a Viernes • 09:00 – 18:00</p>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            (Este horario puede ajustarse según coordinación interna.)
          </p>
        </article>
      </section>

      {/* Nota institucional */}
      <section className="mt-10 rounded-2xl border bg-gray-50 p-6">
        <h3 className="text-lg font-semibold">Recomendación</h3>
        <p className="mt-2 text-sm text-gray-700">
          Para solicitudes formales, utiliza siempre los canales oficiales. Evita compartir
          información sensible por medios no autorizados.
        </p>
      </section>
    </main>
  );
}
