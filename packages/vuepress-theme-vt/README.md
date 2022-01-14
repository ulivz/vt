<br>
<br>

<p align="center">
    <img width="80" src="./media/logo.svg">
    <br>
    <h1 align="center">VT</h1>
</p>

<p align="center">
An <b>Elegant</b> VuePress Theme,<br>
inspired by <code>@vue/theme</code> .
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vuepress-theme-vt"><img src="https://img.shields.io/npm/v/vuepress-theme-vt?color=c95f8b&amp;label=" alt="NPM version"></a></p>

<p align="center"><a target="_blank" href="https://vuepress-theme-vt.vercel.app">📖 Live Documentation</a></p>

<br>
<br>

## Features

- [**Compatibility**](https://vuepress-theme-vt.vercel.app/guide/migration.html): fully compatible with [VuePress's Default Theme](https://vuepress.vuejs.org/theme/default-theme-config.html).
- [**Full-text search**](https://vuepress-theme-vt.vercel.app/guide/search.html): No server dependencies, distinguishing locales.
- [TypeScript Support](https://vuepress-theme-vt.vercel.app/guide/configuration.html)
- [Homepage](https://vuepress-theme-vt.vercel.app/guide/home.html)
- [API Page](https://vuepress-theme-vt.vercel.app/guide/api-page.html)
- i18n, Code Copy, TOC, etc.
- ...

## Motivation

[Next Vue's documentation](https://staging.vuejs.org/) is very cool, which is powered by [VitePress](https://github.com/vuejs/vitepress) and `@vue/theme` —— A next-generation SSG for Vue ecosystem, but currently VitePress is still in early stage and there is no plugin system.

I made this theme to combine eXperience of `@vue/theme` and [current huge VuePress ecosystem](https://github.com/vuepress/awesome-vuepress/), and introducing some built-in features like **full-text search**, **i18n** etc.

## Install

```bash
npm i vuepress-theme-vt -D
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  theme: "vt",
};
```

## Prior Art

`vuepress-theme-vt` won't exist without `@vue/theme` and [VuePress ecosystem](https://github.com/vuepress/awesome-vuepress/):

- [vuepress-plugin-fulltext-search](https://github.com/leo-buneev/vuepress-plugin-fulltext-search), by [@leo-buneev](https://github.com/leo-buneev).
- [icones](https://icones.js.org/), by [@antfu](https://icones.js.org/).

## Sponsors

If my code has helped you, please consider sponsoring me. I'd like to thank these awesome companies for sponsoring me:

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://n8n.io/" target="_blank">
          <img width="100px" src="https://avatars.githubusercontent.com/u/45487711?s=200&v=4">
        </a>
      </td>
    </tr><tr></tr>
  </tbody>
</table>

You can donate through the following channels:

- [Become a backer or sponsor on Patreon.](https://www.patreon.com/ulivz).
- Github Sponsors (WIP).

## LICENSE

MIT License © [ULIVZ](https://github.com/ulivz)
