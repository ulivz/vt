---
sidebarDepth: 0
---

# Config: Home

The following are all the frontmatter configurations for the [homepage](../guide/home.md).

## heroImage

- **Type**: `string`
- **Default**: `undefined`

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

Sub action button's text

```md
---
subActionLink: /guide/
---
```

## features

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