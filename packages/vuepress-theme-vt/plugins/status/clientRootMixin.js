import { $status } from "../../lib/status";

export default {
  data () {
    return {
      shouldDisplayStatus: true,
    }
  },

  methods: {
    $closeCurrentStatus() {
      $status.closeCurrentStatus();
      this.shouldDisplayStatus = false;
      this.$root.$forceUpdate();
    },
  },
};
