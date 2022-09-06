<template>
  <div class="statusbar">
    <Content v-if="statusText.startsWith('$')" :slot-key="statusText.slice(1)" />
    <span v-else>
      {{ statusText }}
    </span>
  </div>
</template>

<script>
export default {
  name: "StatusBar",

  computed: {
    statusText() {
      return (
        (this.$frontmatter && this.$frontmatter.status) ||
        this.$themeLocaleConfig.status
      );
    },
  },
};
</script>

<style lang="stylus">
.statusbar {
  font-size: 15px;
  font-weight: 500;
  position: fixed;
  top: 0;
  height: var(--vp-statusbar-height);
  line-height: var(--vp-statusbar-height);
  text-align: center;
  width: 100%;
  color: white;
  transition: background-color 0.5s;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  z-index: 20;

  span {
    background: transparent;
  }

  p {
    height: var(--vp-statusbar-height);
    line-height: var(--vp-statusbar-height);
    margin: 0;
  }
}

.dark {
  .statusbar {
    background-color: var(--vp-c-bg);

    span {
      color: var(--c-brand);
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
