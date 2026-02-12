import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SITCAS - Sindicato",
  description: "Sitio institucional del sindicato SITCAS.",
};

function Footer() {
  return (
    <footer className="border-t bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-extrabold">SITCAS</div>
            <p className="mt-2 text-sm text-gray-600">
              Plataforma institucional para comunicados, actividades y gestión
              del sindicato.
            </p>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Secciones</div>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>
                <Link className="hover:text-black" href="/comunicados">
                  Comunicados
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/documentos">
                  Documentos
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/galeria">
                  Galería
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/principios">
                  Principios y Fines
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/conocenos">
                  Conócenos
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/afiliacion">
                  Afiliación
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Contacto</div>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>
                Email:&nbsp;
                <a
                  className="font-medium hover:text-black"
                  href="mailto:sitcascgr@sitcascgr.com"
                >
                  sitcascgr@sitcascgr.com
                </a>
              </li>
              <li>
                WhatsApp:&nbsp;
                <a
                  className="font-medium hover:text-black"
                  href="https://wa.me/51967645847"
                  target="_blank"
                  rel="noreferrer"
                >
                  +51 967 645 847
                </a>
              </li>
              <li>Horario: L–V 9:00–18:00</li>
            </ul>
          </div>

          <div className="text-sm">
            <div className="font-semibold">Redes sociales</div>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li>
                <a
                  className="hover:text-black"
                  href="https://www.facebook.com/SITCASCGR/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="hover:text-black"
                  href="https://www.tiktok.com/@sitcascgr"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} SITCAS. Todos los derechos
            reservados.
          </span>
          <span>Hecho con Next.js + WordPress</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${body.variable} ${display.variable}`}>
      <body className="bg-[var(--page-bg)] text-[var(--ink)] antialiased">
        <Header />

        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
