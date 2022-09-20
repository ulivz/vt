---
pageClass: 'config-frontmatter'
---

# Config: Frontmatter

## home

- **Type**: `boolean`
- **Default**: `false`

Declare that current page is homepage:

```md
---
home: true
---
```

For more details please head [Guide > Homepage](../guide/home.md).

## api

- **Type**: `boolean`
- **Default**: `false`

Declare that current page is api page:

```md
---
api: true
---
```

For more details please head [Guide > API Page](../guide/api-page.md).

## toc

- **Type**: `boolean`
- **Default**: `true`

Display table of content at right side, set `false` to hidden it:

```md
---
toc: false
---
```

## sidebar

- **Type**: `boolean`
- **Default**: `true`

Display current sidebar at left side, set `false` to hidden sidebar:

```md
---
sidebar: false
---
```

See [live example](../../../docs/docs/examples/disable-sidebar.md).

## sidebarDepth

- **Type**: `number`
- **Default**: `1`

Set maximum depth of sidebar headers, set `0` to hide headers at it:

```md

```

## navbar

- **Type**: `boolean`
- **Default**: `true`

Display current navbar at the top, set `false` to hidden it:

```md
---
navbar: false
---
```

## pageEdit

Display page edit at the bottom, set `false` to hidden it:

```md
---
pageEdit: false
---
```

## extractApiHeaders

- **Type**: `number[]`
- **Default**: [2, 3]

Extract headers of target levels from api page, by default it will extract `h2` and `h3` headers:

```md
---
extractApiHeaders: [2]
---
```
