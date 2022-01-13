import { ThemeConfig } from "vuepress-theme-vuejs";
import { defineConfig4CustomTheme } from "vuepress/config";

export = defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vt",
  title: "VT",
  themeConfig: {
    repo: 'https://github.com/ulivz/vuepress-theme-vt',
    logo: '/logo.svg',
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],
  },
}));
