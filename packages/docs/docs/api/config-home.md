---
pageClass: 'config-home'
---

# Config: Home

The following are all the frontmatter configurations for the [homepage](../guide/home.md).

## heroImage

- **Type**: `string`
- **Default**: `undefined`

::: tip
In VT, for the style of the homepage, we do not recommend that you use this config, and this config is kept only for compatibility with [VuePress's Default Theme Config](https://vuepress.vuejs.org/theme/default-theme-config.html),
:::

Config hero image.

```md
---
heroImage: /logo.svg
---
```

## actionText

- **Type**: `string`
- **Default**: `undefined`

Main action button's text

```md
---
actionText: Getting Started
---
```

## actionLink

- **Type**: `string`
- **Default**: `undefined`

Main action button's link

```md
---
actionLink: /guide/
---
```

## subActionText

- **Type**: `string`
- **Default**: `undefined`

Sub action button's text

```md
---
subActionText: Install
---
```

## subActionLink

- **Type**: `string`
- **Default**: `undefined`

Sub action button's text

```md
---
subActionLink: /guide/getting-started.html
---
```

## features

- **Type**: `array`
- **Default**: `undefined`

Features configurations, it's better to set **three or six items**:

```md
---
features:
  - title: Full-text search
    details: Full-text search is supported by default, no server dependency, distinguishing locales.
  - title: Out of the box
    details: Compatible with VuePress' default theme, built-in common documentation features, e.g. i18n, Code Copy, TOC.
  - title: TypeScript
    details: It's easier to custom your own config with full TypeScript support.
---
```

## sponsors

- **Type**: `array`
- **Default**: `undefined`

```md
---
sponsors:
  - title: n8n.io
    img: https://avatars.githubusercontent.com/u/45487711?s=200&v=4
    link: https://n8n.io/
---
```

## sponsorsText

- **Type**: `array`
- **Default**: `'Special Sponsor'`

Sponsor's intro text.
