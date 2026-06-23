// Join a path onto the configured base path (e.g. "/joaopabdala/").
// Astro exposes the base as import.meta.env.BASE_URL with a trailing slash.
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}
