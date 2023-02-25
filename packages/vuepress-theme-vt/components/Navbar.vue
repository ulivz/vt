<template>
  <header class="navbar">
    <div class="navbar-container">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
      <NavIcon />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import NavIcon from "@theme/components/NavIcon.vue";

export default {
  name: "Navbar",

  components: {
    SidebarButton,
    NavLinks,
    NavIcon,
  },
};
</script>

<style lang="stylus">
.navbar {
  backdrop-filter: saturate(50%) blur(8px);
  background: var(--vp-c-bg-header);
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vp-navbar-height);
  box-sizing: border-box;

  .navbar-container {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding-right: calc(((100vw - var(--vp-screen-max-width)) / 2));
  }

}

@media (max-width: $MQMobile) {
  .navbar {
    .navbar-container {
      max-width: 100%;
    }

    .can-hide {
      display: none;
    }
  }
}
</style>
