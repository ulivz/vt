# Migration

## Migrate from default theme

Since VT is fully compatible with [VuePress's Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html), migrating from default theme to VT is very easy:

```diff
 // .vuepress/config.js
 module.exports = {
+  theme: 'vt',
   themeConfig: {
   }
 }
```

## Migrate from other themes

First, you need to make sure you are not overly relying on the theme's features. Second, you can migrate based on [Getting Started > Manual Installation](./getting-started.md#manual-installation), if you encounter any issues or features that need to be added, feel free to submit an [issue](https://github.com/ulivz/vt/issues) or [pull request](https://github.com/ulivz/vt/pulls).
