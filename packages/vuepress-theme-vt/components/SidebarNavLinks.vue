<template>
  <div class="sidebar-nav-links">
    <nav
      v-if="currentSidebarNavLinks && currentSidebarNavLinks.length"
      class="sidebar-nav-links-container"
    >
      <div
        v-for="item in currentSidebarNavLinks"
        :key="item.link"
        class="nav-item"
      >
        <NavLink :item="item" />
      </div>
    </nav>
    <div class="sidebar-nav-links-divider"></div>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
  name: "SidebarNavLinks",

  components: {
    NavLink,
  },

  computed: {
    currentSidebarNavLinks() {
      const sidebarNavConfig =
        this.$themeLocaleConfig.sidebarNav || this.$themeConfig.sidebarNav;

      const matched = sidebarNavConfig.find((item) =>
        item.when.some((linkMatcher) =>
          this.$route.path.startsWith(linkMatcher)
        )
      );

      return matched && matched.items;
    },
  },
};
</script>

<style lang="stylus">
:root {
  --vp-sidebar-nav-links-border-radius: 25px;
}

.sidebar-nav-links {
  margin-right: 10px;
}

.sidebar-nav-links-container {
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: var(--vp-c-bg-soft);
  padding: 10px 0;
  margin-bottom: 10px;
  border-radius: var(--vp-sidebar-nav-links-border-radius);

  .nav-item {
    flex: 1;
    text-align: center;
    padding: 0;

    .nav-link {
      background-color: var(--vp-c-bg);
      border-radius: var(--vp-sidebar-nav-links-border-radius);
      padding: 5px 10px;
      width: 100%;
      height: 100%;
      transition: background-color 0.1s;
    }

    .nav-link.router-link-active {
      background-color: var(--vp-c-brand);
      color: var(--vp-c-text-inverse-1);
    }

    .nav-link:not(.router-link-active):hover {
      background-color: var(--vp-c-bg-mute);
    }

    &:last-child {
      margin-right: 0px;
    }
  }
}

.sidebar-nav-links-divider {
  border-bottom: 1px solid var(--vp-c-divider-light-2);
}
</style>