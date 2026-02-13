"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";

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
  const display = list.slice(0, 6);
  const loop = display.length > 2 ? [...display, ...display] : display;
  const shouldAnimate = display.length > 2;

  if (display.length === 0) {
    return <p className="text-sm text-gray-500">Aún no hay comunicados publicados.</p>;
  }

  const tickerStyle = {
    "--item-height": "100px",
    "--items": String(display.length),
    "--visible": "2",
  } as CSSProperties;

  return (
    <div className="latest-wrap">
      <div className="ticker" style={tickerStyle}>
        <div className={`ticker-track ${shouldAnimate ? "animate" : ""}`}>
          {loop.map((c, idx) => {
            const title = decodeEntities(stripHtml(c.title?.rendered));
            const excerpt = decodeEntities(stripHtml(c.excerpt?.rendered || ""));
            return (
              <Link
                key={`${c.id}-${idx}`}
                href={`/comunicados/${c.slug}`}
                className="ticker-item"
              >
                <div className="item-header">
                  <span className="item-dot" />
                  <span className="item-date">{formatDate(c.date)}</span>
                </div>
                <div className="item-title line-clamp-1">{title}</div>
                <div className="item-excerpt line-clamp-2">{excerpt}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Se actualiza automáticamente con los últimos comunicados.
      </div>

      <style jsx>{`
        .latest-wrap {
          animation: fadeInUp 0.6s ease both;
        }
        .ticker {
          position: relative;
          overflow: hidden;
          height: calc(var(--item-height) * var(--visible));
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
        }
        .ticker-track {
          display: grid;
          gap: 10px;
        }
        .ticker-track.animate {
          animation: scroll 18s linear infinite;
        }
        .ticker:hover .ticker-track.animate {
          animation-play-state: paused;
        }
        .ticker-item {
          height: var(--item-height);
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 10px 12px;
          display: block;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ticker-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
        }
        .item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .item-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--accent);
        }
        .item-title {
          margin-top: 4px;
          font-weight: 700;
          color: #111827;
          font-size: 16px;
        }
        .item-excerpt {
          margin-top: 2px;
          font-size: 13px;
          color: #4b5563;
        }
        @keyframes scroll {
          to {
            transform: translateY(calc(-1 * var(--item-height) * var(--items)));
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
