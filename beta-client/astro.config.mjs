import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  integrations: [tailwind(), compress({
      css: { restructure: false }
      })],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
