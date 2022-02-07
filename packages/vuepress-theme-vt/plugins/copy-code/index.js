const { path } = require("@vuepress/shared-utils");

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options, context) => ({
  name: "@vt/copy-code",
  define: {
    COPY_SELECTOR: options.copy_selector || 'div[class*="language-"]',
  },
  clientRootMixin: path.resolve(__dirname, "clientRootMixin.js"),
});
