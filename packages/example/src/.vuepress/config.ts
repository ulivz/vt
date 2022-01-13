import { ThemeConfig } from "vuepress-theme-vuejs";
import { defineConfig4CustomTheme } from "vuepress/config";

export = defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vuejs",
  title: "Vue.js",
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.svg',
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],
  },
}));
