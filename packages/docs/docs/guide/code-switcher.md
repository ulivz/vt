# Code Switcher

::: tip
Inspired by [vuepress-plugin-code-switcher](https://github.com/padarom/vuepress-plugin-code-switcher).
:::

## Quick Start

- Input

````md
<CodeSwitcher :languages="{ js: 'JavaScript', ts: 'TypeScript' }">
<template v-slot:js>

```js
module.exports = function (str) {
  return typeof str === "string" && str.trim() === str;
};
```

</template>
<template v-slot:ts>

```ts
export default function isString(str: string): str is string {
  return typeof str === "string" && str.trim() === str;
}
```

</template>
</CodeSwitcher>
````

- Output:

<CodeSwitcher :languages="{js:'JavaScript',ts:'TypeScript'}">
<template v-slot:js>

```js
module.exports = function (str) {
  return typeof str === "string" && str.trim() === str;
};
```

</template>
<template v-slot:ts>

```ts
export default function isString(str: string): str is string {
  return typeof str === "string" && str.trim() === str;
}
```

</template>
</CodeSwitcher>

## Custom Groups

### Define Groups

```ts
// .vuepress/config.ts
import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";

export = defineConfig4CustomTheme<ThemeConfig>({
  theme: "vt",
  themeConfig: {
    codeSwitcher: {
      groups: {
        default: { ts: "TypeScript", js: "JavaScript" },
        "plugin-usage": { tuple: "Tuple", object: "Object" },
      },
    },
  },
});
```

### Using Groups

- Input:

````md
<CodeSwitcher name="plugin-usage">
<template v-slot:tuple>

```ts
module.exports = {
  plugins: [
    [
      "vuepress-plugin-xxx",
      {
        /* options */
      },
    ],
  ],
};
```

</template>
<template v-slot:object>

```ts
module.exports = {
  plugins: {
    xxx: {
      /* options */
    },
  },
};
```

</template>
</CodeSwitcher>
````

- Output:

<CodeSwitcher name="plugin-usage">
<template v-slot:tuple>

```ts
module.exports = {
  plugins: [
    [
      "foo",
      {
        /* options */
      },
    ],
  ],
};
```

</template>
<template v-slot:object>

```ts
module.exports = {
  plugins: {
    foo: {
      /* options */
    },
  },
};
```

</template>
</CodeSwitcher>
