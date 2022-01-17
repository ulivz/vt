# Dark Mode <Badge text="0.2.0+"/>

## Quick Start

```js
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {
    enableDarkMode: true,
  },
};
```

## Styling Guide

To ensure that your site display correctly at dark mode, you need use following CSS Variables for your custom components:

| Type   | CSS Variable                |
| ------ | --------------------------- |
| Background Color | `var(--vp-c-bg)` |
| Text | `var(--vp-c-text-1)` |
| Border | `var(--vp-c-divider-light)` |
