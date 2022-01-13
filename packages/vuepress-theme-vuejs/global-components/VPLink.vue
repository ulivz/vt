<template>
  <RouterLink
    v-if="isInternal"
    class="vp-link"
    :to="link"
    :exact="exact"
    @focusout.native="focusoutAction"
  >
    <slot name="before" />
    {{ text }}
    <slot name="after" />
  </RouterLink>
  <a
    v-else
    :href="link"
    class="vp-link external"
    :target="normalizedTarget"
    :rel="normalizedRel"
    @focusout="focusoutAction"
  >
    <slot name="before" />
    {{ text }}
    <VPIconExternalLink v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel } from "../lib/util";

export default {
  name: "VPLink",

  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    target: {
      type: String,
    },
    rel: {
      type: String,
    },
  },

  computed: {
    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          (rootLink) => rootLink === this.link
        );
      }
      return this.link === "/";
    },

    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link);
    },

    isBlankTarget() {
      return this.target === "_blank";
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget;
    },

    normalizedTarget() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.target) {
        return this.target;
      }
      return isExternal(this.link) ? "_blank" : "";
    },

    normalizedRel() {
      if (this.isNonHttpURI) {
        return null;
      }
      if (this.rel === false) {
        return null;
      }
      if (this.rel) {
        return this.rel;
      }
      return this.isBlankTarget ? "noopener noreferrer" : null;
    },
  },

  methods: {
    focusoutAction() {
      this.$emit("focusout");
    },
  },
};
</script>
