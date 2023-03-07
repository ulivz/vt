<template>
  <div class="links">
    <nav v-if="userLinks.length || repoLink" class="nav-left-links">
      <div v-for="item in userLeftLinks" :key="item.link" class="nav-item">
        <DropdownLink v-if="item.type === 'links'" :item="item" />
        <NavLink v-else :item="item" />
      </div>
    </nav>

    <AlgoliaSearchBox
      v-if="showSearchBox && isAlgoliaSearch"
      :options="algolia"
    />
    <SearchBox
      v-else-if="
        showSearchBox &&
        $site.themeConfig.search !== false &&
        $page.frontmatter.search !== false
      "
    />

    <nav v-if="userLinks.length || repoLink" class="nav-links">
      <!-- user links -->
      <div v-for="item in userLinks" :key="item.link" class="nav-item">
        <DropdownLink v-if="item.type === 'links'" :item="item" />
        <NavLink v-else :item="item" />
      </div>

      <VPNavBarAppearance v-if="enableDarkMode" class="appearance" />

      <!-- repo link -->
      <a
        v-if="repoLink"
        :href="repoLink"
        class="repo-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <VPIconGithub v-if="repoLabel === 'GitHub'" />
        <VPIconGitlab v-else-if="repoLabel === 'Gitlab'" />
        <template v-else{{ repoLabel }}></template>
      </a>
    </nav>
  </div>
</template>

<script>
import AlgoliaSearchBox from "@AlgoliaSearchBox";
import SearchBox from "@SearchBox";
import DropdownLink from "@theme/components/DropdownLink.vue";
import { resolveNavLinkItem } from "../lib/util";
import NavLink from "@theme/components/NavLink.vue";
import VPIconGitlab from "./icons/VPIconGitlab.vue";
import VPIconGithub from "./icons/VPIconGithub.vue";
import VPNavBarAppearance from "./VPNavBarAppearance.vue";

export default {
  name: "NavLinks",

  components: {
    SearchBox,
    AlgoliaSearchBox,
    NavLink,
    DropdownLink,
    VPIconGitlab,
    VPIconGithub,
    VPNavBarAppearance,
  },

  props: {
    showSearchBox: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    enableDarkMode() {
      return (
        this.$themeLocaleConfig.enableDarkMode ||
        this.$site.themeConfig.enableDarkMode
      );
    },

    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },

    userLeftNav() {
      return this.userNav.filter((nav) => nav.position === "left");
    },

    userRightNav() {
      return this.userNav.filter((nav) => nav.position !== "left");
    },

    nav() {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || "Languages",
          ariaLabel: this.$themeLocaleConfig.ariaLabel || "Select language",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some((route) => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };
        return [...this.userRightNav, languageDropdown];
      }
      return this.userRightNav;
    },

    userLinks() {
      return (this.nav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },

    userLeftLinks() {
      return (this.userLeftNav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },

    repoLink() {
      const { repo } = this.$site.themeConfig;
      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }
      return null;
    },

    repoLabel() {
      if (!this.repoLink) return;
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel;
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, "i").test(repoHost)) {
          return platform;
        }
      }

      return "Source";
    },

    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    },
  },
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
@require '../styles/mixins.styl';

.links {
  height: 100%;
  padding-left: 1.5rem;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  .search-box {
    flex: 0 0 auto;
    vertical-align: top;
  }
}

@media (max-width: $MQMobile) {
  .links {
    padding-left: 1.5rem;
  }
}

.nav-links, .nav-left-links {
  display: inline-block;
  max-width: calc(100vw - 260px);

  a {
    line-height: 1.4rem;
    color: inherit;

    &:hover, &.router-link-active {
      navbar-active-bg();
    }
  }

  .nav-item {
    position: relative;
    display: inline-block;
    margin-left: 1.5rem;
    line-height: 2rem;

    &:first-child {
      margin-left: 0;
    }
  }
}

.nav-links {
  .repo-link {
    // display: flex;
    // align-items: center;
    height: 100%;
    margin-left: 1.5rem;
    line-height: 2rem;

    svg {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .appearance {
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
  }
}

.nav-left-links {
  flex: 1;
}

@media (max-width: $MQMobile) {
  .nav-left-links {
    display: block;
    position: relative;
  }

  .nav-links, .nav-left-links {
    .nav-item, .repo-link {
      margin-left: 0;
    }

    .appearance {
      margin-left: 0px;
    }
  }
}

@media (min-width: $MQMobile) {
  .nav-links .nav-item > a {
    &:hover, &.router-link-active {
      navbar-active-bg();
    }
  }

  .nav-item > a:not(.external) {
    &:hover, &.router-link-active {
      margin-bottom: -2px;

      &::before {
        background-color: var(--vp-c-brand);
      }
    }
  }
}
</style>
