"use client";

import { useEffect, useRef, useState } from "react";

export default function AfiliacionForm({ formatoUrl }: { formatoUrl: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const updateValidity = () => {
    if (!formRef.current) return;
    setIsValid(formRef.current.checkValidity());
  };

  useEffect(() => {
    updateValidity();
  }, []);

  return (
    <form
      ref={formRef}
      className="border rounded-3xl p-8 space-y-6"
      action="/api/afiliacion"
      method="POST"
      encType="multipart/form-data"
      onInput={updateValidity}
      onChange={updateValidity}
      onSubmit={(e) => {
        const ok = window.confirm(
          "¿Está seguro de enviar su solicitud de afiliación?"
        );
        if (!ok) {
          e.preventDefault();
        }
      }}
    >
      {/* Nombres / Apellidos */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombres</label>
          <input
            type="text"
            name="nombres"
            required
            placeholder="Ingrese sus nombres"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            required
            placeholder="Ingrese sus apellidos"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* DNI / Celular */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">DNI</label>
          <input
            type="text"
            name="dni"
            required
            inputMode="numeric"
            pattern="[0-9]{8}"
            placeholder="8 dígitos"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Celular</label>
          <input
            type="text"
            name="celular"
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
          name="correo"
          required
          placeholder="correo@ejemplo.com"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
        />
      </div>

      {/* Gerencia / Sede */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Gerencia / Subgerencia
          </label>
          <input
            type="text"
            name="gerencia"
            required
            placeholder="Gerencia o subgerencia"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sede</label>
          <input
            type="text"
            name="sede"
            required
            placeholder="Sede o ubicación"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* Profesión / Fecha ingreso */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Profesión</label>
          <input
            type="text"
            name="profesion"
            required
            placeholder="Profesión"
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fecha de ingreso a la Contraloría
          </label>
          <input
            type="date"
            name="fecha_ingreso"
            required
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* Régimen */}
      <div>
        <label className="block text-sm font-medium mb-1">Régimen laboral</label>
        <select
          name="regimen"
          required
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
        >
          <option value="">Seleccione una opción</option>
          <option value="CAS Indeterminado">CAS Indeterminado</option>
          <option value="CAS Temporal">CAS Temporal</option>
          <option value="728 Indeterminado">728 Indeterminado</option>
          <option value="728 Temporal">728 Temporal</option>
        </select>
      </div>

      {/* Formato */}
      <div className="rounded-2xl border bg-gray-50 p-4">
        <p className="text-sm font-semibold">
          Descarga el formato editable y súbelo debidamente llenado y firmado
        </p>
        <div className="mt-3">
          <a
            href={formatoUrl}
            className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            download
          >
            Descargar formato editable
          </a>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Si el botón no descarga, verifica que el archivo exista en
          <span className="font-medium"> /public/formatos/</span>.
        </p>
      </div>

      {/* Archivo */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Formato firmado
        </label>
        <div className="flex flex-col gap-2">
          <input
            id="formato_firmado"
            type="file"
            name="formato_firmado"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            required
            className="sr-only"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              setFileName(file ? file.name : "Ningún archivo seleccionado");
              updateValidity();
            }}
          />
          <label
            htmlFor="formato_firmado"
            className="inline-flex w-fit items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 cursor-pointer"
          >
            Seleccionar archivo
          </label>
          <div className="text-xs text-gray-600">{fileName}</div>
        </div>
      </div>

      {/* Comentario */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Comentario (opcional)
        </label>
        <textarea
          name="comentario"
          rows={4}
          placeholder="Puede agregar un comentario adicional"
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring"
        />
      </div>

      {/* Botón */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-black text-white py-3 rounded-xl font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Enviar solicitud de afiliación
        </button>
      </div>
    </form>
  );
}
