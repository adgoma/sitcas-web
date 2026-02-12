"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

type Slide = {
  id: number;
  title: { rendered: string };
  acf?: {
    subtitulo?: string;
    boton_texto?: string;
    boton_url?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

export default function HomeSlider({ slides }: { slides: Slide[] }) {
  const safeSlides = useMemo(() => (Array.isArray(slides) ? slides : []), [slides]);
  const [current, setCurrent] = useState(0);

  // Asegura que current no quede fuera si cambian slides
  useEffect(() => {
    if (current > safeSlides.length - 1) setCurrent(0);
  }, [safeSlides.length, current]);

  // 🔄 Rotación automática cada 5 segundos
  useEffect(() => {
    if (safeSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % safeSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [safeSlides.length]);

  if (safeSlides.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-black shadow-sm">
      <div className="relative h-[340px] md:h-[450px]">
        {/* Slides */}
        {safeSlides.map((slide, index) => {
          const isActive = index === current;

          const img = slide._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
          const alt =
            slide._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
            stripHtml(slide.title?.rendered || "");

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Imagen */}
              {img ? (
                <img
                  src={img}
                  alt={alt}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="h-full w-full bg-gray-700" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Contenido */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl px-6 md:px-10 text-white">
                  <h2 className="text-3xl md:text-5xl font-bold">
                    {stripHtml(slide.title?.rendered || "")}
                  </h2>

                  {slide.acf?.subtitulo && (
                    <p className="mt-4 max-w-2xl text-lg md:text-xl font-medium text-white/95 leading-relaxed">
                      {slide.acf.subtitulo}
                    </p>
                  )}

                  {slide.acf?.boton_url && (
                    <div className="mt-6">
                      <Link
                        href={slide.acf.boton_url}
                        className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                      >
                        {slide.acf.boton_texto || "Ver más"} →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* ✅ Puntitos PERMANENTES (fuera del map) */}
        {safeSlides.length > 1 && (
          <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
            {safeSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === current
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
