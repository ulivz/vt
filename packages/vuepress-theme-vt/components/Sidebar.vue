<template>
  <aside class="sidebar">
    <slot name="top" />

    <NavLinks :showSearchBox="false" />

    <SidebarNavLinks />

    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import SidebarNavLinks from "@theme/components/SidebarNavLinks.vue";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, SidebarNavLinks },

  props: ["items"],
};
</script>

<style lang="stylus">
.sidebar {
  display: flex;
  flex-direction: column;

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .links {
    display: none;
    border-bottom: 1px solid var(--vp-c-divider-light);
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 500;
    }

    .nav-item, .repo-link, .appearance {
      display: block;
      line-height: 1.25rem;
      font-size: 13px;
      padding: 0.5rem 0 0.5rem 0rem;
    }
  }

  & > .sidebar-links {
    padding: 2rem 0;
    padding-top: 1rem;

    & > li > a.sidebar-link {
      line-height: 1.7;
      font-weight: bold;
      color: inherit;
      font-size: 14px;
    }

    & > li:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    padding-left: 1rem;

    .links {
      display: block;
      padding-left: 0;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }

      .nav-item, .repo-link, .mobile-dropdown-title {
        font-size: 15px;
      }
    }

    & > .sidebar-links {
      padding: 1rem 0;
    }
  }
}
</style>
