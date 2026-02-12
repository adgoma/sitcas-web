// apps/web/lib/wordpress.ts
export const WP_API_BASE = process.env.WP_API_URL;

if (!WP_API_BASE) {
  throw new Error("Falta NEXT_PUBLIC_WP_API_BASE en .env.local");
}

export async function wpFetch<T>(path: string): Promise<T> {
  const url = `${WP_API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // cache 60s (ajústalo)
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WP fetch error ${res.status}: ${url}\n${text}`);
  }

  return res.json() as Promise<T>;
}