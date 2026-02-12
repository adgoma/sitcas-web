import Link from "next/link";

export default function AfiliacionPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10">
      {/* HERO */}
      <section className="border rounded-3xl p-8 md:p-12">
        <p className="text-sm text-gray-600">Afiliación</p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Afíliate al sindicato
        </h1>

        <p className="mt-4 text-gray-700 max-w-3xl">
          La afiliación fortalece la representación de los trabajadores y
          consolida acciones institucionales en defensa de nuestros derechos.
          Aquí encontrarás quiénes pueden afiliarse, los beneficios y el proceso
          paso a paso.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/afiliacion/formulario"
            className="px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Ir al formulario
          </Link>

          <Link
            href="/comunicados"
            className="px-5 py-3 rounded-xl border hover:shadow"
          >
            Ver comunicados
          </Link>
        </div>
      </section>

      {/* ELEGIBILIDAD / BENEFICIOS / REQUISITOS */}
      <section className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">¿Quiénes pueden afiliarse?</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Trabajadores de la Contraloría General de la República bajo los
            regímenes laborales CAS o 728, de acuerdo con el estatuto y las
            reglas internas del sindicato.
          </p>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">Beneficios de afiliarse</h3>
          <ul className="mt-2 text-gray-700 text-sm list-disc pl-5 space-y-2">
            <li>Representación y defensa colectiva de derechos laborales.</li>
            <li>Asesoría y acompañamiento en gestiones gremiales.</li>
            <li>Información oportuna mediante comunicados institucionales.</li>
            <li>Participación en actividades y capacitaciones.</li>
          </ul>
        </div>

        <div className="border rounded-2xl p-6">
          <h3 className="font-semibold">Requisitos básicos</h3>
          <ul className="mt-2 text-gray-700 text-sm list-disc pl-5 space-y-2">
            <li>Datos personales y laborales completos.</li>
            <li>Formato de afiliación debidamente llenado y firmado.</li>
            <li>Documento de identidad vigente.</li>
          </ul>
        </div>
      </section>

      {/* PROCESO */}
      <section className="border rounded-3xl p-8 md:p-10 mt-8">
        <h2 className="text-2xl md:text-3xl font-bold">Proceso de afiliación</h2>
        <p className="mt-3 text-gray-700 max-w-4xl">
          Sigue estos pasos para completar tu solicitud. El equipo sindical
          validará la información y se comunicará contigo para la confirmación.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">1. Descarga el formato</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Descarga el formato editable, complétalo y fírmalo.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">2. Completa el formulario</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Registra tus datos y adjunta el formato firmado.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">3. Revisión</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Verificamos la información y la condición laboral.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h4 className="font-semibold">4. Confirmación</h4>
            <p className="mt-2 text-gray-700 text-sm">
              Te contactaremos para confirmar tu afiliación.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/afiliacion/formulario"
            className="inline-flex px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Ir al formulario →
          </Link>
          <Link
            href="/contacto"
            className="inline-flex px-5 py-3 rounded-xl border hover:bg-gray-50"
          >
            Consultas y contacto
          </Link>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="border rounded-3xl p-8 md:p-10 mt-8">
        <h3 className="text-xl font-semibold">Canales de atención</h3>
        <p className="mt-2 text-gray-700 text-sm">
          Para consultas adicionales, comunícate por los canales oficiales.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="inline-flex px-5 py-3 rounded-xl border hover:bg-gray-50"
          >
            Ir a contacto
          </Link>
          <Link
            href="/afiliacion/formulario"
            className="inline-flex px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
          >
            Solicitar afiliación
          </Link>
        </div>
      </section>
    </main>
  );
}
