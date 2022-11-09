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
  font-size: 16px;
  font-weight: bolder;
  position: fixed;
  top: 0;
  height: 0px;
  line-height: var(--vp-statusbar-height);
  text-align: center;
  overflow: hidden;
  width: 100%;
  color: white;
  background: linear-gradient(
    45deg,
    #f17c58,
    #e94584,
    #24aadb,
    #27dbb1,
    #ffdc18,
    #ff3706
  );
  background-size: 600% 100%;
  animation: status-gradient 16s linear 0s infinite alternate, status-height 1.5s linear 0.5s 1 normal forwards;
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

@keyframes status-gradient {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}

@keyframes status-height {
  0% {
    height: 0px;
  }

  100% {
    height: var(--vp-statusbar-height);
  }
}
</style>
