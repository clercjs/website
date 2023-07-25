import UnoCSS from "unocss/vite";
import { defineConfig } from "vitepress";

export const sharedConfig = defineConfig({
  title: "Clerc",
  appearance: "dark",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/logo.webp", type: "image/webp" }]],
  themeConfig: {
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
  vite: {
    plugins: [UnoCSS()],
  },
});
