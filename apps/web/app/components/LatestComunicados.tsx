"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Comunicado = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
};

function stripHtml(html: string) {
  return (html || "").replace(/<[^>]*>/g, "").trim();
}

function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default function LatestComunicados({
  items,
}: {
  items: Comunicado[];
}) {
  const list = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, 5000);
    return () => clearInterval(id);
  }, [list.length]);

  if (list.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Aún no hay comunicados publicados.
      </p>
    );
  }

  const current = list[index];

  return (
    <div className="space-y-4">
      <Link
        key={current.id}
        href={`/comunicados/${current.slug}`}
        className="block rounded-xl border bg-white p-4 hover:shadow-sm transition"
      >
        <div className="font-semibold">{decodeEntities(stripHtml(current.title?.rendered))}</div>
        <div className="mt-1 text-xs text-gray-500">
          {formatDate(current.date)}
        </div>
        <div className="mt-2 text-sm text-gray-700 line-clamp-2">
          {decodeEntities(stripHtml(current.excerpt?.rendered || ""))}
        </div>
      </Link>

      {list.length > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index
                    ? "bg-[var(--accent)] scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir al comunicado ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() =>
                setIndex((prev) => (prev - 1 + list.length) % list.length)
              }
              className="rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setIndex((prev) => (prev + 1) % list.length)}
              className="rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

