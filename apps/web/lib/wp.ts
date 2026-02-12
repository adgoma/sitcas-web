export type WpComunicado = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: any;
};

export { wpFetch } from "./wordpress";

const WP_BASE = process.env.WP_BASE_URL;

function requireEnv(value: string | undefined, name: string) {
  if (!value) throw new Error(`Falta variable de entorno: ${name}`);
  return value;
}

export async function getWpComunicados() {
  const base = requireEnv(WP_BASE, "WP_BASE_URL");

  const res = await fetch(
    `${base}/wp-json/wp/v2/comunicados?_embed&per_page=10&orderby=date&order=desc`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP getWpComunicados error ${res.status}: ${text}`);
  }

  const data: WpComunicado[] = await res.json();
  return data;
}

export async function getWpComunicadoBySlug(slug: string) {
  const base = requireEnv(WP_BASE, "WP_BASE_URL");

  const res = await fetch(
    `${base}/wp-json/wp/v2/comunicados?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP getWpComunicadoBySlug error ${res.status}: ${text}`);
  }

  const arr: WpComunicado[] = await res.json();
  return arr[0] ?? null;
}
