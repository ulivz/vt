# @speedy-js/workflow

> Atomic workflow-related tooling packages for Speedy Stack.

## Status

|name|description|version|documentation|
|---|---|---|---|
|`@speedy-js/depcost`|Retrieve the time and space<br> cost of a dependency.|[![npm version](https://badgen.net/npm/v/@speedy-js/depcost)](https://npm.im/@speedy-js/depcost)|[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/depcost/README.md)|
|`@speedy-js/publish`|Shipped a standard `npm publish` <br>workflow for **single** repository.|[![npm version](https://badgen.net/npm/v/@speedy-js/publish)](https://npm.im/@speedy-js/publish) |[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/publish/README.md)|
|`@speedy-js/mono`|Monorepo development & continuous<br> integration tooling.|[![npm version](https://badgen.net/npm/v/@speedy-js/mono)](https://npm.im/@speedy-js/mono) |[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/mono/README.md)|
|`@speedy-js/config-loader`|An out-of-box config loader with<br>TypeScript support.|[![npm version](https://badgen.net/npm/v/@speedy-js/config-loader)](https://npm.im/@speedy-js/config-loader) |[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/config-loader/README.md)|
|`@speedy-js/eslint-config`|ESLint config for Speedy Framework<br>Developers|[![npm version](https://badgen.net/npm/v/@speedy-js/eslint-config)](https://npm.im/@speedy-js/eslint-config) |[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/eslint-config/README.md)|
|`@speedy-js/generic-types`|Generic types utilities|[![npm version](https://badgen.net/npm/v/@speedy-js/generic-types)](https://npm.im/@speedy-js/generic-types) |[Documentation](https://github.com/speedy-js/workflow/blob/master/packages/generic-types/README.md)|


## Contribution

This project uses a monorepo setup that requires using [pnpm](https://pnpm.io/):

```bash
npm i -g pnpm

# Install all dependencies.
# e.g. pnpm install --prefer-offline --registry https://registry.npmmirror.com
npm run bootstrap

# Build all packages.
npm run build
```

For all usage about `pnpm`, pleas head [pnpm's documentation](https://rushjs.io/).


## License

MIT &copy; [ULIVZ](https://github.com/sponsors/ulivz)