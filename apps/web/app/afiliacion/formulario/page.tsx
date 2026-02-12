export default function AfiliacionFormularioPage() {
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

      {/* Formulario + Info */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* FORMULARIO */}
        <form className="border rounded-3xl p-8 space-y-6">
          {/* Nombres / Apellidos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombres
              </label>
              <input
                type="text"
                required
                placeholder="Ingrese sus nombres"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Apellidos
              </label>
              <input
                type="text"
                required
                placeholder="Ingrese sus apellidos"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* DNI / Celular */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                DNI
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{8}"
                placeholder="8 dígitos"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Celular
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{9}"
                placeholder="9 dígitos"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Área / Sede */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Área / Unidad
              </label>
              <input
                type="text"
                placeholder="Área o unidad de trabajo"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sede
              </label>
              <input
                type="text"
                placeholder="Sede o ubicación"
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Comentario (opcional)
            </label>
            <textarea
              rows={4}
              placeholder="Puede agregar un comentario adicional"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
            />
          </div>

          {/* Botón */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Enviar solicitud de afiliación
            </button>
          </div>
        </form>

        {/* INFO LATERAL */}
        <aside className="border rounded-3xl p-8 h-fit">
          <h3 className="font-semibold text-lg">Importante</h3>

          <ul className="mt-4 text-gray-700 text-sm list-disc pl-5 space-y-2">
            <li>Los datos se usan solo para registro y comunicación sindical.</li>
            <li>Verifique que el correo esté correcto para recibir confirmación.</li>
            <li>El DNI debe tener 8 dígitos y el celular 9 dígitos.</li>
          </ul>

          <div className="border rounded-2xl p-4 mt-6">
            <p className="text-sm font-semibold">Contacto</p>
            <p className="text-sm text-gray-700 mt-1">
              sitcascgr@gmail.com
            </p>
            <p className="text-sm text-gray-700">
              L–V 09:00–18:00
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
