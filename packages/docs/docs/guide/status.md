---
status: <GlobalStatus />
statusVersion: v5
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

## Using Vue Component

You can specify page status via a global Vue Component, let's create `.vuepress/components/GlobalStatus.vue` as example:
  
```vue
<template>
  <span> This is page status </span>
</template>
```

- via page frontmatter config:

```md
---
status: <GlobalStatus />
---
```

- via global config:

```ts
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {
    status: '<GlobalStatus />'
  },
};
```

## Closing Status

You can use a global method `$closeCurrentStatus` to close status:

```vue
<template>
  <span>
    This is page status &nbsp;
    <a style="cursor: pointer" @click="$closeCurrentStatus">x</a>
  </span>
</template>
```

and using `statusVersion` to control the status version:

- via page frontmatter config:

```md
---
status: <GlobalStatus />
statusVersion: v2
---
```

- via global config:

```ts
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {
    status: '<GlobalStatus />',
    statusVersion: 'v2'
  },
};
```

You need bump `statusVersion` when you released new status, so that user can see the new status.