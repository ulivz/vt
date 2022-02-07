const { resolve } = require("path");

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options, ctx) => ({
  name: "@vt/code-switcher",
  plugins: [
    [
      "@vuepress/register-components",
      { componentsDir: resolve(__dirname, "./components") },
    ],
  ],
  clientDynamicModules() {
    return {
      name: "code-switcher-groups.js",
      content: `export default ${JSON.stringify(options.groups)}`,
    };
  },
});
