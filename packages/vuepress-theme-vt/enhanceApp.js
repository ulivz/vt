import { $status, STATUS_HIDDEN_EVENT } from "./lib/status";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // Vue.prototype.$status = $status;
  Vue.mixin({
    methods: {
      $closeCurrentStatus() {
        $status.closeCurrentStatus();
        this.$root.$emit(STATUS_HIDDEN_EVENT);
      },
      $withLocale: function (path) {
        if (path.startsWith("/")) {
          return this.$localePath + path.replace(/^\//, "");
        }
        return path;
      },
    },
  });
};
