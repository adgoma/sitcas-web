"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AfiliacionAlert() {
  const params = useSearchParams();
  const ok = params.get("ok") === "1";
  const error = params.get("error") === "1";
  const shownRef = useRef(false);

  useEffect(() => {
    if (shownRef.current) return;
    if (ok) {
      window.alert(
        "Su solicitud de afiliación ha sido enviada con éxito. Pronto estaremos en comunicación con usted."
      );
      shownRef.current = true;
      return;
    }
    if (error) {
      window.alert(
        "Hubo un problema al enviar el formulario. Verifique los datos e intente nuevamente."
      );
      shownRef.current = true;
    }
  }, [ok, error]);

  if (!ok && !error) return null;

  if (ok) {
    return (
      <div
        role="alert"
        className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
      >
        Su solicitud de afiliación ha sido enviada con éxito. Pronto estaremos
        en comunicación con usted.
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      Hubo un problema al enviar el formulario. Verifique los datos e intente
      nuevamente.
    </div>
  );
}
