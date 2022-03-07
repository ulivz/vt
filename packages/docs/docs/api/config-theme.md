---
pageClass: 'config-theme'
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
  },
};
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
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "External", link: "https://google.com" },
    ],
  },
};
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
    navbar: false,
  },
};
```

## sidebar

- **Type**: `array | object`
- **Default**: `undefined`

Note that sidebar in VT is fully compatible with [Default Theme Config > Navbar](https://vuepress.vuejs.org/theme/default-theme-config.html#navbar), but to make sure you can enjoy [API Page](../guide/api-page.md), we recommend that you use [Multiple Sidebars](https://vuepress.vuejs.org/theme/default-theme-../config.html#multiple-sidebars):

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],

      // fallback
      "/": [
        "" /* / */,
        "contact" /* /contact.html */,
        "about" /* /about.html */,
      ],
    },
  },
};
```

## search

- **Type**: `boolean`
- **Default**: `true`

Enable search box or not, set `false` to hidden search box globally:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    search: false,
  },
};
```

## searchMaxSuggestions

- **Type**: `number`
- **Default**: `5`

Customize how many suggestions will be shown:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    searchMaxSuggestions: 10,
  },
};
```

## searchPlaceholder

- **Type**: `string`
- **Default**: `Search`

Custom placeholder of search box.

## algolia

- **Type**: `object`
- **Default**: `undefined`

Since we've already shipped full-text search, so you don't need use algolia search. If you insist on using it, please move [Default Theme Config > Algolia Search](https://vuepress.vuejs.org/theme/default-theme-config.html#algolia-search).

## lastUpdated

- **Type**: `string`
- **Default**: `'Last Updated'`

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: "Last Updated", // string | boolean
  },
};
```

## nextLinks

- **Type**: `boolean`
- **Default**: `true`

Set it to false to hide next page links on all pages:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nextLinks: false,
  },
};
```

## prevLinks

- **Type**: `boolean`
- **Default**: `true`

Set it to false to hide prev page links on all pages:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    prevLinks: false,
  },
};
```

## repo

- **Type**: `string`
- **Default**: `undefined`

Repository's url, assumes GitHub, can also be a full GitLab url.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // equal to "https://github.com/ulivz/vuepress-theme-vt"
    repo: "ulivz/vuepress-theme-vt",
  },
};
```

## repoLabel

- **Type**: `string`
- **Default**: `undefined`

Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`.

::: tip
Note the in VT the repo link will be shown as icon.
:::

## docsRepo

- **Type**: `string`
- **Default**: `your repo link`

Using this if your docs are in a different repo from your main project.

## docsDir

- **Type**: `string`
- **Default**: `''`

Using this if your docs are not at the root of the repo.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    docsDir: "docs",
  },
};
```

## docsBranch

- **Type**: `string`
- **Default**: `master`

Using this if your docs are in master branch.

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    docsBranch: "main",
  },
};
```

## editLinks

- **Type**: `boolean`
- **Default**: `false`

Defaults to false, set to true to enable:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    editLinks: true,
  },
};
```

## editLinkText

- **Type**: `string`
- **Default**: `Edit this page`

Custom text for edit link:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    editLinkText: "Help us improve this page!",
  },
};
```

## smoothScroll

- **Type**: `boolean`
- **Default**: `false`

Enable smooth scrolling.

## locales

- **Type**: `object`
- **Default**: `false`

See [Internationalization](https://vuepress.vuejs.org/guide/i18n.html#site-level-i18n-config).

## label

- **Type**: `string`
- **Default**: `undefined`

i18n only.

## selectText

- **Type**: `string`
- **Default**: `undefined`

i18n only.
