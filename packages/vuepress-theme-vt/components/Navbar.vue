<template>
  <header class="navbar">
    <div class="navbar-container">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

      <RouterLink :to="$localePath" class="home-link">
        <img
          v-if="$site.themeConfig.logo"
          class="logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        />
        <span
          v-if="$siteTitle"
          ref="siteName"
          class="site-name"
          :class="{ 'can-hide': $site.themeConfig.logo }"
          >{{ $siteTitle }}</span
        >
      </RouterLink>

      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import SidebarButton from "@theme/components/SidebarButton.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  name: "Navbar",

  components: {
    SidebarButton,
    NavLinks,
  },
};
</script>

<style lang="stylus">

.navbar {
  background-color: var(--vp-c-bg);
  transition: background-color 0.5s;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  height: $navbarHeight;
  box-sizing: border-box;
  border-bottom: 1px solid var(--vp-c-divider-light);

  .navbar-container {
    height: 100%;
    max-width: var(--vp-screen-max-width);
    margin: 0 auto;
    display: flex;
  }

  .home-link {
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
    background-color: var(--vp-c-bg);
    padding-right: 1rem;
  }

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: 1.4rem;
    min-width: 1.4rem;
    margin-right: 0.2rem;
  }

  .site-name {
    font-size: 22px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    position: relative;
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

    .site-name {
      width: calc(100vw - 9.4rem);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

</style>
