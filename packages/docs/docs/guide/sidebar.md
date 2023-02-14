# Sidebar

## Different to VuePress

Different to [VuePress Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html), [sidebarDepth](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) in VT defaults to `0` while VuePress defaults to `1`, so you cannot see the nested header links in VT by default.

## Config by frontmatter

You can display [nested header links](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) for specified page by frontmatter:

```md
---
sidebarDepth: 1
---
```

## Config by file

You can display [nested header links](https://vuepress.vuejs.org/theme/default-theme-config.html#nested-header-links) for all pages by config:

```diff
  themeConfig: {
+   sidebarDepth: 1
  }
```
