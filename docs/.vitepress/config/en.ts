import { defineConfig } from "vitepress";

export const enConfig = defineConfig({
  lang: "en-US",
  description: "The The full-featured Command-Line Interface library",
  themeConfig: {
    siteTitle: "Clerc Official Docs",
    nav: [
      {
        text: "Guide",
        link: "/getting-start",
      },
      {
        text: "Members",
        link: "/members",
      },
      {
        text: "Sponsor (CN)",
        link: "https://afdian.net/a/so1ve",
      },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Commands",
            link: "/commands",
          },
          {
            text: "Inspectors",
            link: "/inspectors",
          },
          {
            text: "Plugins",
            link: "/plugins",
          },
        ],
      },
      {
        text: "Official Plugins",
        link: "/official-plugins",
      },
    ],
    editLink: {
      text: "Suggest to this page",
      pattern: "https://github.com/clercjs/website/tree/main/docs/:path",
    },
    outline: {
      label: "This page",
    },
    docFooter: {
      prev: "Previous",
      next: "Next",
    },
    footer: {
      message: "Released under the MIT license",
      copyright: "Copyright © 2023-present ClercJS",
    },
  },
});
