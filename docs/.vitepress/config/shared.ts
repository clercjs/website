import UnoCSS from "unocss/vite";
import { defineConfig } from "vitepress";
import {
	groupIconMdPlugin,
	groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

export const sharedConfig = defineConfig({
	title: "Clerc",
	appearance: "dark",
	lastUpdated: true,
	head: [["link", { rel: "icon", href: "/logo.webp", type: "image/webp" }]],
	themeConfig: {
		logo: {
			light: "/black.webp",
			dark: "/white.webp",
		},
		outline: [2, 3],
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/clercjs/clerc",
			},
		],
		search: {
			provider: "local",
		},
	},
	markdown: {
		config(md) {
			md.use(groupIconMdPlugin);
		},
	},
	vite: {
		plugins: [groupIconVitePlugin(), UnoCSS()],
	},
});
