import Link from "next/link";

const PRINCIPIOS = [
  {
    title: "Legalidad y transparencia",
    description:
      "Actuamos con apego a la normativa aplicable y rendición de cuentas hacia los afiliados.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Representación y unidad",
    description:
      "Promovemos la cohesión entre trabajadores para una defensa efectiva de intereses comunes.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 11a4 4 0 1 0-8 0" />
        <path d="M6 20a6 6 0 0 1 12 0" />
        <path d="M18.5 8.5a3 3 0 1 0-3 3" />
        <path d="M21 20a5 5 0 0 0-3.5-4.8" />
      </svg>
    ),
  },
  {
    title: "Participación democrática",
    description:
      "Impulsamos decisiones informadas y participación de los afiliados en procesos internos.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 7h16" />
        <path d="M7 7v10a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V7" />
        <path d="M9 4h6" />
      </svg>
    ),
  },
  {
    title: "Respeto y no discriminación",
    description:
      "Garantizamos un trato digno, igualdad de oportunidades y espacios seguros.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7v10a5 5 0 0 0 10 0V7" />
      </svg>
    ),
  },
];

const FINES = [
  {
    title: "Defensa de derechos laborales",
    description:
      "Promover y proteger los derechos e intereses de los trabajadores en el marco normativo vigente.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>
    ),
  },
  {
    title: "Mejora de condiciones de trabajo",
    description:
      "Impulsar propuestas y gestiones que mejoren condiciones, beneficios y bienestar laboral.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 12h18" />
        <path d="M12 3v18" />
        <path d="M6 6h12v12H6z" />
      </svg>
    ),
  },
  {
    title: "Comunicación institucional",
    description:
      "Informar oportunamente mediante comunicados oficiales, canales de contacto y transparencia de gestiones.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16v9H7l-3 3V6z" />
        <path d="M8 10h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Fortalecimiento organizacional",
    description:
      "Desarrollar capacidades internas, orden documental y mecanismos de soporte para afiliados.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7h18" />
        <path d="M5 7v12h14V7" />
        <path d="M9 11h6" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
];

export default function PrincipiosPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-red-50 p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-200/50 blur-2xl" />
        <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

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
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-white hover:opacity-90 btn-primary"
          >
            Ver comunicados
          </Link>
          <Link
            href="/afiliacion"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50 btn-secondary"
          >
            Afíliate
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Principios */}
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 3l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
              </svg>
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Principios</h2>
              <p className="text-sm text-gray-600">
                Lineamientos que definen nuestra identidad y forma de trabajo.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {PRINCIPIOS.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700 group-hover:bg-red-100">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Fines */}
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 4h14v6H5z" />
                <path d="M7 10v8h10v-8" />
                <path d="M9 14h6" />
              </svg>
            </span>
            <div>
              <h2 className="text-2xl font-semibold">Fines</h2>
              <p className="text-sm text-gray-600">
                Objetivos que guían nuestras acciones y prioridades institucionales.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {FINES.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700 group-hover:bg-red-100">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Cierre */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-white to-red-50 p-8">
        <h3 className="text-xl font-semibold">Compromiso</h3>
        <p className="mt-2 text-gray-600 max-w-4xl">
          Estos principios y fines orientan el trabajo institucional del sindicato.
          Su contenido puede ajustarse y ampliarse conforme a acuerdos internos y
          documentación oficial.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/conocenos"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50 btn-secondary"
          >
            Conócenos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50 btn-secondary"
          >
            Contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
