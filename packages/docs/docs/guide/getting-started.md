---
sidebarDepth: 0
---

# Getting Started

## Prerequisites

- [Node.js 10+](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/) (Optional)\*

## Quick Start

The fastest way to use this theme is to use our [create-vt generator](https://github.com/vuepressjs/create-vuepress-site/), which will help scaffold a basic VuePress site with this theme for you.

To use it, open up your terminal in the desired directory and run the following command:

```bash
npm create vt@latest [optionalDirectoryName]
```

The command will interactively ask for details to configure your VuePress site’s metadata such as:

- Project Name
- Description
- Maintainer Email
- Maintainer Name

To see it in action, navigate into newly scaffolded directory, install the dependencies and start the local server:

```bash
pnpm run dev
```

## Manual Installation

If you prefer, you can build a basic VuePress documentation site from ground up instead of using the generator mentioned above.

1. Create and change into a new directory

```bash
mkdir my-vt && cd my-vt
```

2. Initialize with your preferred package manager

```bash
pnpm init
```

3. Install `vuepress-theme-vt` and `vuepress` locally

```bash
pnpm i vuepress-theme-vt vuepress -D
```

4. Create your first document

```bash
mkdir docs && echo '# Hello VT' > docs/README.md
```

5. Create config file and use this theme

Creating [.vuepress/config.js](https://vuepress.vuejs.org/guide/basic-config.html) with following config:

```js
// .vuepress/config.js
module.exports = {
  theme: "vt",
  themeConfig: {},
};
```

5. Add npm scripts to `package.json`

This step is optional but highly recommended, as the rest of the documentation will assume those scripts being present.

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6. Serve the documentation site in the local server

```bash
npm run docs:dev
```

VuePress will start a hot-reloading development server at [http://localhost:8080](http://localhost:8080).

By now, you should have a basic VuePress documentation site powered by VT.
