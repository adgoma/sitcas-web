import Link from "next/link";

export default function PrincipiosPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="rounded-3xl border p-8">
        <p className="text-sm text-gray-500">Institucional</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Principios y Fines
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Este espacio reúne los principios que guían la actuación del sindicato y
          los fines que orientan nuestras acciones en defensa de los derechos e
          intereses de los trabajadores.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/comunicados"
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
          >
            Ver comunicados
          </Link>
          <Link
            href="/afiliacion"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50"
          >
            Afíliate
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Principios */}
        <article className="rounded-3xl border p-8">
          <h2 className="text-2xl font-semibold">Principios</h2>
          <p className="mt-2 text-gray-600">
            Lineamientos que definen nuestra identidad y forma de trabajo.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="rounded-2xl border p-4">
              <p className="font-medium">Legalidad y transparencia</p>
              <p className="mt-1 text-sm text-gray-600">
                Actuamos con apego a la normativa aplicable y rendición de cuentas
                hacia los afiliados.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Representación y unidad</p>
              <p className="mt-1 text-sm text-gray-600">
                Promovemos la cohesión entre trabajadores para una defensa efectiva
                de intereses comunes.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Participación democrática</p>
              <p className="mt-1 text-sm text-gray-600">
                Impulsamos decisiones informadas y participación de los afiliados
                en procesos internos.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Respeto y no discriminación</p>
              <p className="mt-1 text-sm text-gray-600">
                Garantizamos un trato digno, igualdad de oportunidades y espacios
                seguros.
              </p>
            </li>
          </ul>
        </article>

        {/* Fines */}
        <article className="rounded-3xl border p-8">
          <h2 className="text-2xl font-semibold">Fines</h2>
          <p className="mt-2 text-gray-600">
            Objetivos que guían nuestras acciones y prioridades institucionales.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="rounded-2xl border p-4">
              <p className="font-medium">Defensa de derechos laborales</p>
              <p className="mt-1 text-sm text-gray-600">
                Promover y proteger los derechos e intereses de los trabajadores en
                el marco normativo vigente.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Mejora de condiciones de trabajo</p>
              <p className="mt-1 text-sm text-gray-600">
                Impulsar propuestas y gestiones que mejoren condiciones,
                beneficios y bienestar laboral.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Comunicación institucional</p>
              <p className="mt-1 text-sm text-gray-600">
                Informar oportunamente mediante comunicados oficiales, canales de
                contacto y transparencia de gestiones.
              </p>
            </li>

            <li className="rounded-2xl border p-4">
              <p className="font-medium">Fortalecimiento organizacional</p>
              <p className="mt-1 text-sm text-gray-600">
                Desarrollar capacidades internas, orden documental y mecanismos de
                soporte para afiliados.
              </p>
            </li>
          </ul>
        </article>
      </section>

      {/* Cierre */}
      <section className="mt-10 rounded-3xl border p-8">
        <h3 className="text-xl font-semibold">Compromiso</h3>
        <p className="mt-2 text-gray-600 max-w-4xl">
          Estos principios y fines orientan el trabajo institucional del sindicato.
          Su contenido puede ajustarse y ampliarse conforme a acuerdos internos y
          documentación oficial.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/conocenos"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50"
          >
            Conócenos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50"
          >
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
