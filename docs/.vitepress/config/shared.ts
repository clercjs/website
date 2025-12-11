import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { createFileSystemTypesCache } from "@shikijs/vitepress-twoslash/cache-fs";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vitepress";
import {
	groupIconMdPlugin,
	groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

import { MarkdownTransform, clercImports } from "../plugins/markdownTransform";

export const sharedConfig = defineConfig({
	title: "Clerc",
	// appearance: "dark",
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
		codeTransformers: [
			transformerTwoslash({
				twoslashOptions: {
					handbookOptions: {
						noErrors: true,
					},
				},
				includesMap: new Map([
					[
						"imports",
						`// ---cut-start---\nimport { ${clercImports.join(", ")} } from "clerc";\n// ---cut-end---`,
					],
				]),
				typesCache: createFileSystemTypesCache(),
			}),
		],
		languages: ["js", "jsx", "ts", "tsx"],
	},
	vite: {
		plugins: [groupIconVitePlugin(), UnoCSS(), MarkdownTransform()],
	},
});
