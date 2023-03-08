const { path } = require("@vuepress/shared-utils");

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options, context) => ({
  name: "@vt/status",
  clientRootMixin: path.resolve(__dirname, "clientRootMixin.js"),
});
