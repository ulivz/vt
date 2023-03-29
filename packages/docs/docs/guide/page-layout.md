# Page Layout

## Motivation

If you want to hidden `sidebar`, `toc` and `pageEdit` at the page section and only remain `<Header>`, you'll need page layout.

## Quick Start

1. Declare a [Global Vue Component](https://vuepress.vuejs.org/guide/directory-structure.html), e.g. `.vuepress/components/PageLayout1.vue`.
2. Declare `pageLayout` via [Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html):

```md
---
pageLayout: PageLayout1
---
```

An example [here](../examples/using-page-layout.md).
