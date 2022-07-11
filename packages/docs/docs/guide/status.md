---
status: $status
---

# Status

You can specify status text like the top of this document.

## Global Status

Specify global status via `themeConfig.status`:

```ts
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {
    status: 'This is global status'
  },
};
```

## Page Status

Specify page status via [frontmatter.status](https://vuepress.vuejs.org/guide/frontmatter.html):


```md
---
status: 'This is page status'
---
```

## Rich-text page status

You can specify rich-text page status via [markdown slot](https://vuepress.vuejs.org/guide/markdown-slot.html).

Note that you'll need declare [frontmatter.status](https://vuepress.vuejs.org/guide/frontmatter.html) to `$variable` to tell VT to leverage corresponding slot:

```md
---
status: $status
---

::: status
This is page status, [jump to home page](/)
:::
```

::: slot status
This is page status, [jump to home page](/)
:::