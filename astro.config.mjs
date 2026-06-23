// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Project-repo GitHub Pages: served under /joaopabdala/.
// Swap `site` and remove `base` if a custom domain is added later.
export default defineConfig({
  site: 'https://joaopabdala.github.io',
  base: '/joaopabdala',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
