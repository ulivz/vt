<template>
  <VPLink
    class="nav-link"
    :text="item.text"
    :link="ensuredLink"
    :target="item.target"
    :rel="item.rel"
    @focusout="focusoutAction"
  />
</template>

<script>
import { ensureExt } from "../lib/util";

export default {
  name: "NavLink",

  props: {
    item: {
      required: true,
    },
  },

  computed: {
    ensuredLink() {
      return ensureExt(this.item.link);
    },
  },

  methods: {
    focusoutAction() {
      this.$emit("focusout");
    },
  },
};
</script>
