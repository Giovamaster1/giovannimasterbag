import dotenv from 'dotenv/config';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  server: {
    host: true
  },
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react()]
});
