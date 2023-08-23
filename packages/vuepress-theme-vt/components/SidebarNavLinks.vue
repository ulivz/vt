<template>
  <div
    class="sidebar-nav-links"
    v-if="currentSidebarNavLink && currentSidebarNavLink.items.length"
  >
    <div class="sidebar-nav-links-title" v-if="currentSidebarNavLink.title">
      {{ currentSidebarNavLink.title }}
    </div>
    <nav class="sidebar-nav-links-container">
      <div
        v-for="item in currentSidebarNavLink.items"
        :key="item.link"
        class="nav-item"
      >
        <NavLink
          :item="item"
          :class="{
            'nav-item-range-matched': isRangeMatched(
              item.activeRange,
              $route.path
            ),
          }"
        />
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
    currentSidebarNavLink() {
      const sidebarNavConfig =
        this.$themeLocaleConfig.sidebarNav || this.$themeConfig.sidebarNav;

      const matched = sidebarNavConfig.find((item) =>
        item.when.some((linkMatcher) =>
          this.$route.path.startsWith(linkMatcher)
        )
      );

      return matched;
    },
  },

  methods: {
    isRangeMatched(activeRange, routePath) {
      if (!activeRange) {
        return false;
      }
      if (Array.isArray(activeRange)) {
        return activeRange.some((range) => routePath.startsWith(range));
      }
      return routePath.startsWith(activeRange);
    },
  },
};
</script>

<style lang="stylus">
.sidebar-nav-links {
  margin-right: 10px;
  padding-top: 10px;
}

.sidebar-nav-links-title {
  color: var(--vp-c-text-2);
  font-weight: bolder;
  margin-bottom: 10px;
  font-size: 12px;
}

.sidebar-nav-links-container {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
  background-color: var(--vp-c-bg);
  margin-bottom: 12px;
  border-radius: var(--vp-common-border-radius);
  margin-left: -10px;


  .nav-item {
    flex: 1;
    text-align: center;
    padding: 0;
    height: 28px;
    position: relative;

    .nav-link.nav-item-range-matched, .nav-link.router-link-active {
      background-color: var(--vp-c-brand);
      color: var(--vp-c-text-inverse-1);
    }

    .nav-link {
      background-color: var(--vp-c-bg-soft);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 18px;
      padding: 5px 10px;
      transition: background-color 0.1s;
    }

    .nav-link:not(.router-link-active):not(.nav-item-range-matched) {
      border: 1px solid var(--vp-c-divider-light-2);

      &:hover {
        background-color: var(--vp-c-bg-mute);
      }
    }

    &:last-child {
      margin-right: 0px;

      .nav-link {
        border-top-right-radius: var(--vp-common-border-radius);
        border-bottom-right-radius: var(--vp-common-border-radius);
      }
    }

    &:first-child {
      .nav-link {
        border-top-left-radius: var(--vp-common-border-radius);
        border-bottom-left-radius: var(--vp-common-border-radius);
      }
    }
  }
}

.sidebar-nav-links-divider {
  border-bottom: 1px solid var(--vp-c-divider-light-2);
}
</style>
