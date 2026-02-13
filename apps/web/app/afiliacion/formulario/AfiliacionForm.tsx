"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";

export default function AfiliacionForm({ formatoUrl }: { formatoUrl: string }) {
  const MAX_FILE_SIZE_MB = 2;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-500";
  const formRef = useRef<HTMLFormElement>(null);
  const [isValid, setIsValid] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateValidity = () => {
    if (!formRef.current) return;
    setIsValid(formRef.current.checkValidity());
  };

  useEffect(() => {
    updateValidity();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadError(null);

    if (!formRef.current) return;
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    const ok = window.confirm(
      "¿Está seguro de enviar su solicitud de afiliación?"
    );
    if (!ok) return;

    if (!file) {
      setUploadError("Debe seleccionar el archivo firmado.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(
        `El archivo es muy pesado. Debe ser menor a ${MAX_FILE_SIZE_MB} MB.`
      );
      return;
    }

    try {
      setUploading(true);
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });

      const data = new FormData(formRef.current);
      data.set("formato_url", blob.url);
      data.delete("formato_firmado");

      const res = await fetch("/api/afiliacion", {
        method: "POST",
        body: data,
      });

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      if (res.ok) {
        window.location.href = "/afiliacion/formulario?ok=1";
        return;
      }

      window.location.href = "/afiliacion/formulario?error=1";
    } catch (err) {
      setUploadError(
        "No se pudo subir el archivo. Intente nuevamente más tarde."
      );
      setUploading(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl shadow-black/5 space-y-6"
      action="/api/afiliacion"
      method="POST"
      encType="multipart/form-data"
      onInput={updateValidity}
      onChange={updateValidity}
      onSubmit={handleSubmit}
    >
      {/* Nombres / Apellidos */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombres</label>
          <input
            type="text"
            name="nombres"
            required
            placeholder="Ingrese sus nombres"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            required
            placeholder="Ingrese sus apellidos"
            className={fieldClass}
          />
        </div>
      </div>

      {/* DNI / Celular */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">DNI</label>
          <input
            type="text"
            name="dni"
            required
            inputMode="numeric"
            pattern="[0-9]{8}"
            placeholder="8 dígitos"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Celular</label>
          <input
            type="text"
            name="celular"
            required
            inputMode="numeric"
            pattern="[0-9]{9}"
            placeholder="9 dígitos"
            className={fieldClass}
          />
        </div>
      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          name="correo"
          required
          placeholder="correo@ejemplo.com"
          className={fieldClass}
        />
      </div>

      {/* Gerencia / Sede */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Gerencia / Subgerencia
          </label>
          <input
            type="text"
            name="gerencia"
            required
            placeholder="Gerencia o subgerencia"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sede</label>
          <input
            type="text"
            name="sede"
            required
            placeholder="Sede o ubicación"
            className={fieldClass}
          />
        </div>
      </div>

      {/* Profesión / Fecha ingreso */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Profesión</label>
          <input
            type="text"
            name="profesion"
            required
            placeholder="Profesión"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Fecha de ingreso a la Contraloría
          </label>
          <input
            type="date"
            name="fecha_ingreso"
            required
            className={fieldClass}
          />
        </div>
      </div>

      {/* Régimen */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Régimen laboral</label>
        <select
          name="regimen"
          required
          className={fieldClass}
        >
          <option value="">Seleccione una opción</option>
          <option value="CAS Indeterminado">CAS Indeterminado</option>
          <option value="CAS Temporal">CAS Temporal</option>
          <option value="728 Indeterminado">728 Indeterminado</option>
          <option value="728 Temporal">728 Temporal</option>
        </select>
      </div>

      {/* Formato */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold">
          Descarga el formato editable y súbelo debidamente llenado y firmado
        </p>
        <div className="mt-3">
          <a
            href={formatoUrl}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm"
            download
          >
            Descargar formato editable
          </a>
        </div>
        <p className="mt-2 text-xs text-gray-600">
          El archivo se subirá antes de enviar tu solicitud.
        </p>
      </div>

      {/* Archivo */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Formato firmado</label>
        <div className="flex flex-col gap-2">
          <input
            id="formato_firmado"
            type="file"
            name="formato_firmado"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            required
            className="sr-only"
            onChange={(e) => {
              const picked = e.currentTarget.files?.[0];
              if (picked && picked.size > MAX_FILE_SIZE_BYTES) {
                setUploadError(
                  `El archivo es muy pesado. Debe ser menor a ${MAX_FILE_SIZE_MB} MB.`
                );
                setFile(null);
                setFileName("Ningún archivo seleccionado");
                e.currentTarget.value = "";
                updateValidity();
                return;
              }
              setFile(picked || null);
              setFileName(picked ? picked.name : "Ningún archivo seleccionado");
              setUploadError(null);
              updateValidity();
            }}
          />
          <label
            htmlFor="formato_firmado"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 cursor-pointer"
          >
            Seleccionar archivo
          </label>
          <div className="text-xs text-gray-600">{fileName}</div>
          <div className="text-xs text-gray-500">
            Peso máximo: {MAX_FILE_SIZE_MB} MB.
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {uploadError}
        </div>
      )}

      {/* Comentario */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Comentario (opcional)
        </label>
        <textarea
          name="comentario"
          rows={4}
          placeholder="Puede agregar un comentario adicional"
          className={fieldClass}
        />
      </div>

      {/* Botón */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isValid || uploading}
          className="w-full py-3 rounded-xl font-medium transition disabled:opacity-60 disabled:cursor-not-allowed btn-primary"
        >
          {uploading ? "Enviando..." : "Enviar solicitud de afiliación"}
        </button>
      </div>
    </form>
  );
}





