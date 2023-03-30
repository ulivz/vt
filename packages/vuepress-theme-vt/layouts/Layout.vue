<template>
  <div>
    <StatusBar :status="status" v-if="status"></StatusBar>
    <div
      class="theme-container"
      :class="pageClasses"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <Home v-if="$page.frontmatter.home" />

      <API v-else-if="$page.frontmatter.api" />

      <div v-else-if="pageLayout" class="custom-page">
        <component :is="pageLayout" />
      </div>

      <Page v-else :sidebar-items="sidebarItems">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>

      <Toc v-if="shouldShowToc" />
    </div>
  </div>
</template>

<script>
/* global SIDEBAR_SCROLL_INTO_VIEW */
import Vue from "vue";
import Home from "@theme/components/Home.vue";
import StatusBar from "@theme/components/StatusBar.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import Toc from "@theme/components/Toc.vue";
import API from "@theme/components/API.vue";
import { resolveSidebarItems } from "../lib/util";
import { $status, STATUS_HIDDEN_EVENT } from "../lib/status";
import { throttle } from "throttle-debounce";

const scrollSidebarActiveLinkIntoView = throttle(200, function () {
  setTimeout(() => {
    const sidebarEls = document.getElementsByClassName("sidebar");
    if (sidebarEls.length > 0) {
      const sidebarEl = sidebarEls[0];
      const targetLink = sidebarEl.querySelector(".active.sidebar-link");
      targetLink.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

const selfClosedComponentRE = /^<([^<>\s]+)\s*\/>$/;

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    StatusBar,
    Navbar,
    Toc,
    API,
  },

  data() {
    return {
      isMounted: false,
      isSidebarOpen: false,
      statusPageStackCount: 0,
      statusClosed: false,
    };
  },

  created() {
    this.$root.$on(STATUS_HIDDEN_EVENT, () => {
      this.statusClosed = true;
    });
  },

  computed: {
    status() {
      // Only display status after layout is mounted
      if (!this.isMounted) {
        return;
      }

      // Check enabling status
      const isEnabled = !this.statusClosed && $status.isSettingEnabled();
      if (!isEnabled) {
        return;
      }

      const statusConfig =
        (this.$frontmatter && this.$frontmatter.status) ||
        this.$themeConfig.status;

      if (typeof statusConfig !== "string") {
        return;
      }

      const matched = statusConfig.match(selfClosedComponentRE);

      if (matched) {
        const component = Vue.component(matched[1]);

        if (component) {
          return {
            type: "component",
            value: component,
          };
        }
      }

      return {
        type: "text",
        value: statusConfig,
      };
    },

    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    showShowSideSection() {
      const { frontmatter } = this.$page;
      return !frontmatter.home && !frontmatter.api && !frontmatter.pageLayout;
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        this.showShowSideSection &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    shouldShowToc() {
      const { frontmatter } = this.$page;
      return this.showShowSideSection && frontmatter.toc !== false;
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },

    pageLayout() {
      const layout = this.getPageLayout();
      if (layout) {
        return Vue.component(layout);
      }
    },
  },

  mounted() {
    if (SIDEBAR_SCROLL_INTO_VIEW) {
      scrollSidebarActiveLinkIntoView();
    }

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });

    // initialize status
    $status.bootstrap();

    // cache current version
    const statusVersion =
      (this.$frontmatter && this.$frontmatter.statusVersion) ||
      this.$themeConfig.statusVersion;

    if (statusVersion) {
      $status.setCurrentVersion(statusVersion);
    }

    this.isMounted = true;
    this.checkStatusPageStackCount();
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    getPageLayout() {
      const layout = this.$page.frontmatter.pageLayout;
      if (
        layout &&
        (this.$vuepress.getLayoutAsyncComponent(layout) ||
          this.$vuepress.getVueComponent(layout))
      ) {
        return layout;
      }
    },

    checkStatusPageStackCount() {
      if (this.status) {
        this.statusPageStackCount++;
      } else {
        this.statusPageStackCount = 0;
      }
    },
  },

  watch: {
    $route() {
      this.checkStatusPageStackCount();
    },

    status(newValue) {
      if (newValue) {
        document.documentElement.classList.add("statusbar-enabled");
      } else {
        document.documentElement.classList.remove("statusbar-enabled");
      }

      if (this.statusPageStackCount === 1) {
        document.documentElement.classList.add("statusbar-first-show");
      } else {
        document.documentElement.classList.remove("statusbar-first-show");
      }
    },
  },
};
</script>

<style lang="stylus">
html.statusbar-enabled.statusbar-first-show {
  .theme-container {
    animation: page-top 1.5s linear 0.5s 1 normal forwards;

    .navbar {
      animation: navbar-top 1.5s linear 0.5s 1 normal forwards;
    }

    .sidebar {
      animation: sidebar-top 1.5s linear 0.5s 1 normal forwards;
    }

    .toc {
      animation: toc-top 1.5s linear 0.5s 1 normal forwards;
    }
  }
}

html.statusbar-enabled:not(.statusbar-first-show) {
  .theme-container {
    animation: page-top 0s linear 0s 1 normal forwards;

    .navbar {
      animation: navbar-top 0s linear 0s 1 normal forwards;
    }

    .sidebar {
      animation: sidebar-top 0s linear 0s 1 normal forwards;
    }

    .toc {
      animation: toc-top 0s linear 0s 1 normal forwards;
    }
  }
}

@keyframes navbar-top {
  0% {
    top: 0px;
  }

  100% {
    top: var(--vp-statusbar-height);
  }
}

@keyframes toc-top {
  0% {
    top: 50px;
  }

  100% {
    top: calc(50px + var(--vp-statusbar-height));
  }
}

@keyframes sidebar-top {
  0% {
    top: var(--vp-navbar-height);
  }

  100% {
    top: calc(var(--vp-navbar-height) + var(--vp-statusbar-height));
  }
}

@keyframes page-top {
  0% {
    padding-top: 0px;
  }

  100% {
    padding-top: var(--vp-statusbar-height);
  }
}
</style>