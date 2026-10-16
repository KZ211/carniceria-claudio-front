// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL pública: cambiarla cuando se conecte el dominio propio.
  site: 'https://carniceria-claudio-front.vercel.app',
  integrations: [react(), sitemap()]
});
