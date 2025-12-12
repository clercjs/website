import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import type { EnhanceAppContext } from "vitepress";
import Theme from "vitepress/theme";
import { defineAsyncComponent, h } from "vue";

import "./style.css";
import "virtual:uno.css";
import "virtual:group-icons.css";
import "@shikijs/vitepress-twoslash/style.css";

export default {
	...Theme,
	enhanceApp({ app }: EnhanceAppContext) {
		app.use(TwoslashFloatingVue);
	},
	Layout() {
		return h(Theme.Layout, null, {
			"layout-top": () =>
				h(
					defineAsyncComponent(
						() => import("./components/DocsMovedBanner.vue"),
					),
				),
		});
	},
};
