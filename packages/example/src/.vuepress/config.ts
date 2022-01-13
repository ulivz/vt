import { ThemeConfig } from "vuepress-theme-vt";
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
    sidebar: {
      '/guide/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            '/guide/',
            '/guide/getting-started',
          ]
        },
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '/guide/home',
            '/guide/config',
            '/guide/typescript',
            '/guide/global-components',
            '/guide/typescript',
          ]
        }
      ]
    }
  },
}));
