# Configuration

## Using TypeScript

In [Getting Started](./getting-started.md), you've know you need use this theme as follows:

```js
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {},
};
```

From 1.9, VuePress introduced [full TypeScript Support](https://github.com/vuejs/vuepress/releases/tag/v1.9.0) for config file, to have type hints for this theme, you can write the configuration like this:

```ts
// .vuepress/config.ts
import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";

export = defineConfig4CustomTheme<ThemeConfig>({
  theme: "vt",
  themeConfig: {},
});
```

## Theme Config

VT's config is fully compatible with [VuePress's Default Theme Config](https://vuepress.vuejs.org/theme/default-theme-config.html), feel free to use VT as default theme.

In additions, VT introduced the following additional features:

> TODO
