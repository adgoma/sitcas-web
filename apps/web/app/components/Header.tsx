"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/comunicados", label: "Comunicados" },
  { href: "/principios", label: "Principios y Fines" },
  { href: "/conocenos", label: "Conócenos" },
  { href: "/afiliacion", label: "Afiliación" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border grid place-items-center font-bold">
            S
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

        <Link
          href="/afiliacion/formulario"
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Afíliate
        </Link>
      </div>
    </header>
  );
}
