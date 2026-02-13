import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

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
  metadataBase: new URL("https://www.sitcascgr.com"),
  title: {
    default: "SITCAS / CGR - Sindicato",
    template: "%s | SITCAS / CGR",
  },
  description: "Sitio institucional del sindicato SITCAS / CGR.",
  alternates: {
    canonical: "https://www.sitcascgr.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.sitcascgr.com",
    siteName: "SITCAS / CGR",
    title: "SITCAS / CGR - Sindicato",
    description: "Sitio institucional del sindicato SITCAS / CGR.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SITCAS / CGR",
      },
      {
        url: "https://sitcascgr.com/og.png",
        width: 1200,
        height: 630,
        alt: "SITCAS / CGR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png", "https://sitcascgr.com/og.png"],
  },
};

function Footer() {
  return (
    <footer className="border-t bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-extrabold">SITCAS / CGR</div>
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
            <div className="mt-3 flex flex-wrap gap-3 text-gray-700">
              <a
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs hover:bg-gray-50"
                href="https://www.facebook.com/SITCASCGR/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook SITCAS"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3.1-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 2.9h-1.8v7A10 10 0 0 0 22 12Z" />
                </svg>
                Facebook
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs hover:bg-gray-50"
                href="https://www.tiktok.com/@sitcascgr"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok SITCAS"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M18.5 5.2c-1-.6-1.8-1.6-2-2.8H13v10.2a2.6 2.6 0 1 1-2.3-2.6v-3a5.6 5.6 0 1 0 5.9 5.6V9.7c1.1.8 2.5 1.2 3.9 1.2V8.2c-.7 0-1.4-.2-2-.6Z" />
                </svg>
                TikTok
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs hover:bg-gray-50"
                href="https://wa.me/51967645847"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp SITCAS"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 0 14 6.9 6.9 0 0 1-3.3-.8l-.4-.2-2.6.7.7-2.5-.2-.4A7 7 0 0 1 12 5Zm3.9 10.2c-.2.6-1 1.1-1.6 1.2-.4.1-.8.1-1.4 0-1-.2-2.2-.8-3.4-2-1.2-1.2-1.9-2.5-2.1-3.4-.1-.6-.1-1 0-1.4.1-.6.6-1.4 1.2-1.6.2-.1.4-.1.6 0l.4.2c.1.1.2.2.3.4l.6 1.4c.1.2.1.4 0 .6l-.3.6c-.1.2-.2.4 0 .7.3.5.8 1.2 1.5 1.9.7.7 1.4 1.2 1.9 1.5.3.2.5.1.7 0l.6-.3c.2-.1.4-.1.6 0l1.4.6c.2.1.3.2.4.3l.2.4c.1.2.1.4 0 .6Z" />
                </svg>
                WhatsApp
              </a>
            </div>
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
          <PageTransition>{children}</PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}
