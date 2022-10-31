# Navbar

## Motivation

Same to [VuePress Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html), The Navbar may contain your page title, [Search Box](https://vuepress.vuejs.org/theme/default-theme-config.html#search-box), [Navbar Links](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar-links), [Languages](https://vuepress.vuejs.org/guide/i18n.html) and [Repository Link](https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links), they all depend on your configuration.

VT introduced some extra Navbar features.

## Nav Links on the left <Badge text="0.6.0+"/>

In [VuePress Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html), you can add links to the navbar via `themeConfig.nav`:

```ts
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],
  },
};
```

These links display on the right by default, you can change them into the right via additional `position` config:

```ts{10}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      {
        text: "Nav Links on the left",
        link: "/guide/navbar.html#nav-links-on-the-left",
        position: "left",
      },
    ],
  },
};
```

The effect is shown on this site.
