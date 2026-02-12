"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/comunicados", label: "Comunicados" },
  { href: "/documentos", label: "Documentos" },
  { href: "/galeria", label: "Galería" },
  { href: "/principios", label: "Principios y Fines" },
  { href: "/conocenos", label: "Conócenos" },
  { href: "/afiliacion", label: "Afiliación" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border bg-white overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-sitcas.ico"
              alt="SITCAS"
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight">SITCAS</div>
            <div className="text-xs text-gray-500">Sindicato CAS</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname.startsWith(l.href);

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`transition ${
                  active
                    ? "text-black font-semibold border-b-2 border-black pb-1"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/afiliacion/formulario"
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Afíliate
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border text-gray-700 hover:bg-gray-50"
        >
          <span className="text-lg font-bold">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/95">
          <nav className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-3 text-sm font-medium">
              {links.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-lg px-3 py-2 transition ${
                      active
                        ? "bg-gray-100 text-black font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                href="/afiliacion/formulario"
                className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Afíliate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
