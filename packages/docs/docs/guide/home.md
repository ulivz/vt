# Homepage

VT's homepage [frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html) configuration supports all options from [VuePress's default theme](https://vuepress.vuejs.org/theme/default-theme-config.html#homepage), at the same time, VT introduce extra features:

1. Additional options: `subActionText`, `subActionLink`, `sponsors`.
2. Configure rich-text `heroText`, `tagline`, and `footer` via [Markdown Slot](https://vuepress.vuejs.org/guide/markdown-slot.html).

## Quick Start

1. Create `docs/index.md`, and declare `home: true` with [Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html):

```md
---
home: true
---
```

2. Declare hero image and hero text:

```md
---
heroImage: /logo.svg
heroText: A Elegant VuePress Theme
---
```

If you want to use markdown syntax to define `heroText`, you can use [Markdown Slot](https://vuepress.vuejs.org/guide/markdown-slot.html):

```md
---
heroImage: /logo.svg
---

::: slot heroText
A <b class="gradient">Elegant</b> VuePress Theme
:::
```

3. Declare action buttons:

```md
---
actionText: Getting Started
actionLink: /guide/
subActionText: Install
subActionLink: /guide/
---
```

4. Declare main features:

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


## Example

The source code for [the Home page you are now seeing](/) is as follows:

```md
---
home: true
heroImage: /logo.svg
actionText: Getting Started
actionLink: /guide/
subActionText: Install
subActionLink: /guide/
features:
- title: Full-text search
  details: Full-text search is supported by default, no server dependency, distinguishing locales.
- title: Out of the box
  details: Compatible with VuePress' default theme, built-in common documentation features, e.g. i18n, Code Copy, TOC.
- title: TypeScript
  details: It's easier to custom your own config with full TypeScript support.
sponsors:
- title: n8n.io
  img: https://avatars.githubusercontent.com/u/45487711?s=200&v=4
  link: https://n8n.io/
---

::: slot heroText
A <b class="gradient">Elegant</b> VuePress Theme
:::

::: slot tagline
A VuePress 1.x theme inspired by `@vue/theme`, fully compatible with VuePress default theme.
:::

::: slot footer
Released under the MIT License.<br>
Copyright © 2022 ULIVZ
:::
```


