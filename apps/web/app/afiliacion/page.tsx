import Link from "next/link";

const BENEFICIOS = [
  "Representación y defensa colectiva de derechos laborales.",
  "Asesoría y acompañamiento en gestiones gremiales.",
  "Información oportuna mediante comunicados institucionales.",
  "Participación en actividades y capacitaciones.",
];

const REQUISITOS = [
  "Datos personales y laborales completos.",
  "Formato de afiliación debidamente llenado y firmado.",
  "Documento de identidad vigente.",
];

const PASOS = [
  {
    title: "Descarga el formato",
    description: "Descarga el formato editable, complétalo y fírmalo.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v12" />
        <path d="M8 11l4 4 4-4" />
        <path d="M4 21h16" />
      </svg>
    ),
  },
  {
    title: "Completa el formulario",
    description: "Registra tus datos y adjunta el formato firmado.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 3h10v4H7z" />
        <path d="M5 7h14v14H5z" />
        <path d="M8 11h8" />
        <path d="M8 15h6" />
      </svg>
    ),
  },
  {
    title: "Revisión",
    description: "Verificamos la información y la condición laboral.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Confirmación",
    description: "Te contactaremos para confirmar tu afiliación.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
];

export default function AfiliacionPage() {
  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-red-50 p-8 md:p-12">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-red-200/50 blur-2xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-slate-200/50 blur-2xl" />

        <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
          Afiliación SITCAS / CGR
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
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
            className="px-5 py-3 rounded-xl text-white hover:opacity-90 btn-primary"
          >
            Ir al formulario
          </Link>

          <Link
            href="/comunicados"
            className="px-5 py-3 rounded-xl border hover:shadow btn-secondary"
          >
            Ver comunicados
          </Link>
        </div>
      </section>

      {/* BLOQUES PRINCIPALES */}
      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z" />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-lg">¿Quiénes pueden afiliarse?</h3>
          <p className="mt-2 text-gray-700 text-sm">
            Trabajadores de la Contraloría General de la República bajo los
            regímenes laborales CAS o 728, de acuerdo con el estatuto y las
            reglas internas del sindicato.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 12h16" />
              <path d="M12 4v16" />
              <path d="M7 7h10v10H7z" />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-lg">Beneficios de afiliarse</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {BENEFICIOS.map((beneficio) => (
              <li key={beneficio} className="flex gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-[10px]">
                  ✓
                </span>
                <span>{beneficio}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M7 3h10v4H7z" />
              <path d="M5 7h14v14H5z" />
            </svg>
          </div>
          <h3 className="mt-4 font-semibold text-lg">Requisitos básicos</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {REQUISITOS.map((req) => (
              <li key={req} className="flex gap-2">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white text-[10px]">
                  •
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* PROCESO */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Proceso de afiliación</h2>
            <p className="mt-2 text-gray-700 max-w-4xl">
              Sigue estos pasos para completar tu solicitud. El equipo sindical
              validará la información y se comunicará contigo para la confirmación.
            </p>
          </div>
          <Link
            href="/afiliacion/formulario"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white hover:opacity-90 btn-primary"
          >
            Iniciar solicitud →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {PASOS.map((paso, index) => (
            <div
              key={paso.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  {paso.icon}
                </span>
                <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
                  Paso {index + 1}
                </div>
              </div>
              <h4 className="mt-3 font-semibold">{paso.title}</h4>
              <p className="mt-2 text-sm text-gray-700">{paso.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/afiliacion/formulario"
            className="inline-flex px-5 py-3 rounded-xl text-white hover:opacity-90 btn-primary"
          >
            Ir al formulario →
          </Link>
          <Link
            href="/contacto"
            className="inline-flex px-5 py-3 rounded-xl border hover:bg-gray-50 btn-secondary"
          >
            Consultas y contacto
          </Link>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Canales de atención</h3>
            <p className="mt-2 text-gray-700 text-sm">
              Para consultas adicionales, comunícate por los canales oficiales.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex px-5 py-3 rounded-xl border hover:bg-gray-50 btn-secondary"
            >
              Ir a contacto
            </Link>
            <Link
              href="/afiliacion/formulario"
              className="inline-flex px-5 py-3 rounded-xl text-white hover:opacity-90 btn-primary"
            >
              Solicitar afiliación
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
