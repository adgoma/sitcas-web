"use client";

import { useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  thumb: string;
  full: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  if (!items.length) return null;

  return (
    <>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            aria-haspopup="dialog"
            className="group text-left overflow-hidden rounded-2xl border bg-gray-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.thumb}
              alt={item.title}
              className="h-full w-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="px-3 py-2 bg-white">
              <div className="text-xs font-semibold text-gray-800">
                {item.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-lg font-semibold text-gray-800 shadow hover:bg-white"
              >
                ×
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.full}
                alt={active.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
            </div>
            <div className="p-5">
              <div className="text-lg font-semibold">{active.title}</div>
              {active.description && (
                <p className="mt-2 text-sm text-gray-700">
                  {active.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
