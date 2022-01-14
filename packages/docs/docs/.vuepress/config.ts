import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";

export = defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vt",
  title: "VT",
  themeConfig: {
    repo: "https://github.com/ulivz/vuepress-theme-vt",
    logo: "/logo.svg",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["/guide/", "/guide/getting-started"],
        },
        {
          title: "Guide",
          collapsable: false,
          children: [
            "/guide/home",
            "/guide/configuration",
            "/guide/global-components",
            "/guide/search",
            "/guide/api-page",
          ],
        },
      ],
      "/api/": [
        {
          title: "Config",
          path: "/api/",
          collapsable: false,
          children: [
            "/api/config-theme",
            "/api/config-frontmatter",
            "/api/config-home",
          ],
        },
      ],
    },
  },
}));
