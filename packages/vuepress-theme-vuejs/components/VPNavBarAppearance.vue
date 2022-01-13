
<template>
  <div class="VPNavBarAppearance">
    <VTSwitchAppearance />
  </div>
</template>

<script>
import VTSwitchAppearance from "./VTSwitchAppearance.vue";

export default {
  components: {
    VTSwitchAppearance,
  },
};
</script>

<style scoped>
.VPNavBarAppearance {
  display: none;
}

@media (min-width: 1280px) {
  .VPNavBarAppearance {
    display: inline-block;
  }
}
</style>
