export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.mixin({
    methods: {
      $withLocale: function (path) {
        if (path.startsWith("/")) {
          return this.$localePath + path.replace(/^\//, "");
        }
        return path;
      },
    },
  });
};
