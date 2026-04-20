import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://way4tech.com',
  integrations: [tailwind(), sitemap(), mdx()],
  compressHTML: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
});
