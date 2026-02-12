import Link from "next/link";

export default function AfiliacionPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      <section className="border rounded-3xl p-8 md:p-12">
        <p className="text-sm text-gray-600">Afiliación</p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Afíliate al Sindicato
        </h1>

        <p className="mt-4 text-gray-700 max-w-3xl">
          La afiliación fortalece la representación y permite consolidar acciones
          institucionales en defensa de los derechos laborales de los trabajadores CAS.
          Aquí encontrarás el proceso y los requisitos generales.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/comunicados"
            className="px-5 py-3 rounded-xl border hover:shadow"
          >
            Ver comunicados
          </Link>

          <Link
            href="/afiliacion/formulario"
            className="px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Consultar por afiliación
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">¿Quiénes pueden afiliarse?</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Trabajadores bajo el régimen CAS vinculados a la Contraloría General de la República,
            conforme a las reglas internas del sindicato.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">Beneficios de afiliarse</h3>
          <ul className="mt-2 text-gray-700 text-sm list-disc pl-5 space-y-2">
            <li>Representación y defensa colectiva de derechos laborales.</li>
            <li>Información oportuna mediante comunicados institucionales.</li>
            <li>Acompañamiento y orientación en gestiones gremiales.</li>
          </ul>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">Canales de atención</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Para consultas, comunícate por los canales oficiales indicados en la sección Contacto.
          </p>
          <Link href="/contacto" className="inline-block mt-3 text-blue-600 text-sm">
            Ir a Contacto →
          </Link>
        </div>
      </section>

      <section className="border rounded-3xl p-8 md:p-10 mt-8">
        <h2 className="text-2xl md:text-3xl font-bold">Proceso de afiliación</h2>
        <p className="mt-3 text-gray-700 max-w-4xl">
          Este proceso se publicará en detalle y se automatizará mediante un formulario institucional.
          Por ahora, estos pasos sirven como guía general.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">1. Solicitud</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Enviar solicitud de afiliación por el canal oficial indicado (temporalmente).
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">2. Verificación</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Validación de información y condición laboral según reglas internas.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/afiliacion/formulario"
            className="inline-flex px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Ir al formulario →
          </Link>
        </div>
      </section>
    </main>
  );
}
