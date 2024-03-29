# Sidebar

## Sidebar Depth

### Different to VuePress

Different to [VuePress Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html), [sidebarDepth](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) in VT defaults to `0` while VuePress defaults to `1`, so you cannot see the nested header links in VT by default.

### Config by frontmatter

You can display [nested header links](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) for specified page by frontmatter:

```md
---
sidebarDepth: 1
---
```

### Config by file

You can display [nested header links](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) for all pages by config:

```diff
  themeConfig: {
+   sidebarDepth: 1
  }
```

## Nested Sidebar Group

VT supports nested sidebar group, the left sidebar you see now, its configuration is as follows:

```ts
import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";

export default defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vt",
  title: "VT",
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            {
              title: "Page",
              children: [
                "/guide/home",
                "/guide/api-page",
                "/guide/page-layout",
                "/guide/navbar",
                "/guide/sidebar",
                "/guide/dark-mode",
              ],
            },
            {
              title: "Modules",
              children: [
                "/guide/search",
                "/guide/global-components",
                "/guide/code-switcher",
                "/guide/status",
              ],
            },
            "/guide/configuration",
            "/guide/migration",
            "/guide/documenting",
          ],
        },
        {
          title: "Reference",
          collapsable: false,
          children: [
            [
              "https://vuepress.vuejs.org/theme/default-theme-config.html",
              "Default Theme Config",
            ],
          ],
        },
      ],
    },
  },
}));
```

By default the first subgroup is opened initially. You can change this using the `initialOpenGroupIndex`: Specify an index to open another subgroup or use `-1` for no open group.


## Sidebar Nav Links <Badge text="0.15.0+"/>

The top navbar of a complex website may be extremely complicated, this results in insufficient space for the top navbar, so VT introduced an sidebar-embedded navbar (called "Sidebar Nav Links"), which can help us complete the "overall switching" ability in the Sidebar.

Here is the config that you can see in this documentation:

```ts
import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";


export default defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vt",
  title: "VT",
  themeConfig: {
    sidebarNav: [
      {
        title: "Quick Link",
        include: ["/guide/"],
        items: [
          {
            text: "Guide",
            link: "/guide/getting-started.html",
            activeRange: "/guide/",
          },
          { text: "Migration", link: "/guide/migration.html" },
        ],
      },
    ],
  }
})
```

**Also see:**

- [Config: Theme > sidebarNav](../api/config-theme.md#sidebarnav)


