import 'dotenv/config';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  server: {
    host: true
  },

  integrations: [react()]
});