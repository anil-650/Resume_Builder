import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	experimental: {
		assets: true
	},
	integrations: [tailwind()],
	output: "server",
	server: { port: 3000 },
	adapter: node({
		mode: "standalone"
	})
});
