---
sidebarDepth: 0
---

# Config: Theme

## logo

- **Type**: `string`
- **Default**: `false`

You can add a logo to the navbar via `themeConfig.logo`

```ts
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: "/logo.svg",
  }
}
```

## nav

- **Type**: `string`
- **Default**: `false`

You can add links to the navbar via `themeConfig.nav`:

```ts
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' }
    ]
  }
}
```

For more usage, please head [Default Theme Config > Navbar](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar).

## navbar

- **Type**: `boolean`
- **Default**: `false`

To disable the navbar globally, use `themeConfig.navbar`:

```ts
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

## sidebar

## search

## searchMaxSuggestions

## searchPlaceholder

## algolia

## lastUpdated

## nextLinks

## prevLinks

## repo

## repoLabel

## docsRepo

## docsDir

## docsBranch

## editLinks

## editLinkText

## smoothScroll

## locales

## label

## selectText

## activeHeaderLinks
