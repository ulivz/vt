# API Page

## Motivation

VT helps you generate an API page [like this site's API page](/api/), which is very useful to index APIs.

## Quick Start

### 1. Create API pages

Create `api/index.md` and some sub pages:

```diff
 ├── docs
 │   ├── api
+│   │   ├── config-foo.md
+│   │   ├── config-bar.md
+│   │   ├── config-baz.md
+│   │   └── index.md
 │   ├── guide
 │   │   ├── getting-started.md
 │   │   ├── index.md
 │   │   └── ...
 │   └── index.md
 └── package.json
```

### 2. Config sidebar

Using [Multiple Sidebars](https://vuepress.vuejs.org/theme/default-theme-config.html#multiple-sidebars) to define a sidebar for API.

```ts
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {
    sidebar: {
      "/api/": [
        {
          title: "Config",
          path: "/api/",
          collapsable: false,
          children: ["/api/config-foo", "/api/config-bar", "/api/config-baz"],
        },
      ],
    },
  },
};
```

### 3. Enable API page layout

Declare that `api/index.md` is api index page:

```md
---
api: true
---
```
