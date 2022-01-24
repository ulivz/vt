<template>
  <div class="search-box">
    <input
      ref="input"
      aria-label="Search"
      :value="query"
      :class="{ focused: focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="query = $event.target.value"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    />
    <IconSearch class="search-icon" @click.native="expandSearchInput" />
    <SearchCommand class="search-command" @onCommand="expandSearchInput" />
    <ul
      v-if="showSuggestions"
      class="suggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path + s.slug" @click.prevent>
          <div
            v-if="s.parentPageTitle"
            class="parent-page-title"
            v-html="s.parentPageTitle"
          />
          <div class="suggestion-row">
            <div class="page-title">{{ s.title || s.path }}</div>
            <div class="suggestion-content">
              <!-- prettier-ignore -->
              <div v-if="s.headingStr" class="header">
                {{ s.headingDisplay.prefix }}<span class="highlight">{{ s.headingDisplay.highlightedContent }}</span>{{ s.headingDisplay.suffix }}
              </div>
              <!-- prettier-ignore -->
              <div v-if="s.contentStr">
                {{ s.contentDisplay.prefix }}<span class="highlight">{{ s.contentDisplay.highlightedContent }}</span>{{ s.contentDisplay.suffix }}
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import flexsearchSvc from "../services/flexsearchSvc";
import IconSearch from "./IconSearch.vue";
import SearchCommand from "./SearchCommand.vue";

// see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
import hooks from "@dynamic/hooks";

/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: "SearchBox",
  data() {
    return {
      query: "",
      focused: false,
      focusIndex: 0,
      suggestions: null,
    };
  },
  components: {
    IconSearch,
    SearchCommand,
  },
  computed: {
    queryTerms() {
      if (!this.query) return [];
      const result = flexsearchSvc
        .normalizeString(this.query)
        .split(/[^\p{L}\p{N}_]+/iu)
        .filter((t) => t);
      return result;
    },
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    },

    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length;
      const repo = this.$site.repo ? 1 : 0;
      return navCount + repo <= 2;
    },
    placeholder() {
      return (
        this.$localeConfig.searchPlaceholder ||
        this.$site.themeConfig.searchPlaceholder ||
        "Search"
      );
    },
  },
  watch: {
    query() {
      this.getSuggestions();
    },
    $localePath() {
      this.bindIndexPages();
    },
  },
  /* global OPTIONS */
  mounted() {
    this.bindIndexPages();
    // set query from URL
    const params = this.urlParams();
    if (params) {
      const query = params.get("query");
      if (query) {
        this.query = decodeURI(query);
        this.focused = true;
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onHotkey);
  },
  methods: {
    bindIndexPages() {
      const options = OPTIONS || {};
      const locales = this.$site.locales;

      /**
       * Handle search scope for i18n.
       */
      if (typeof locales === "object") {
        const nonMatchedLocales = Object.keys(locales).filter(
          (key) => key !== this.$localePath
        );
        const indexPages = this.$site.pages.filter((page) =>
          nonMatchedLocales.every((locale) => {
            if (locale === "/") {
              return page.path.startsWith(this.$localePath);
            }
            return !page.path.startsWith(locale);
          })
        );
        flexsearchSvc.buildIndex(indexPages, options);
      } else {
        flexsearchSvc.buildIndex(this.$site.pages, options);
      }

      document.addEventListener("keydown", this.onHotkey);
    },
    async getSuggestions() {
      if (!this.query || !this.queryTerms.length) {
        this.suggestions = [];
        return;
      }
      let suggestions = await flexsearchSvc.match(
        this.query,
        this.queryTerms,
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS
      );
      if (hooks.processSuggestions) {
        // augment suggestions with user-provided function
        suggestions = await hooks.processSuggestions(
          suggestions,
          this.query,
          this.queryTerms
        );
      }
      this.suggestions = suggestions.map((s) => ({
        ...s,
        headingDisplay: highlight(s.headingStr, s.headingHighlight),
        contentDisplay: highlight(s.contentStr, s.contentHighlight),
      }));
    },
    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== "/" && page.path.indexOf(localePath) === 0) {
          return localePath;
        }
      }
      return "/";
    },
    isSearchable(page) {
      let searchPaths = SEARCH_PATHS;
      // all paths searchables
      if (searchPaths === null) {
        return true;
      }
      searchPaths = Array.isArray(searchPaths)
        ? searchPaths
        : new Array(searchPaths);
      return (
        searchPaths.filter((path) => {
          return page.path.match(path);
        }).length > 0
      );
    },
    onHotkey(event) {
      if (
        event.srcElement === document.body &&
        SEARCH_HOTKEYS.includes(event.key)
      ) {
        this.$refs.input.focus();
        event.preventDefault();
      }
    },
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--;
        } else {
          this.focusIndex = this.suggestions.length - 1;
        }
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        } else {
          this.focusIndex = 0;
        }
      }
    },
    go(i) {
      if (!this.showSuggestions) {
        return;
      }
      if (hooks.onGoToSuggestion) {
        const result = hooks.onGoToSuggestion(
          i,
          this.suggestions[i],
          this.query,
          this.queryTerms
        );
        if (result === true) return;
      }
      if (this.suggestions[i].external) {
        window.open(
          this.suggestions[i].path + this.suggestions[i].slug,
          "_blank"
        );
      } else {
        this.$router.push(this.suggestions[i].path + this.suggestions[i].slug);
        this.query = "";
        this.focusIndex = 0;
        this.focused = false;

        // reset query param
        const params = this.urlParams();
        if (params) {
          params.delete("query");
          const paramsString = params.toString();
          const newState =
            window.location.pathname + (paramsString ? `?${paramsString}` : "");
          history.pushState(null, "", newState);
        }
      }
    },
    focus(i) {
      this.focusIndex = i;
    },
    unfocus() {
      this.focusIndex = -1;
    },
    urlParams() {
      if (!window.location.search) {
        return null;
      }
      return new URLSearchParams(window.location.search);
    },
    expandSearchInput() {
      this.$refs.input.focus();
      this.focused = true;
    },
  },
};

function highlight(str, strHighlight) {
  if (!str) return {};
  if (!strHighlight) return { prefix: str };
  const [start, length] = strHighlight;
  const end = start + length;

  const prefix = str.slice(0, start);
  const highlightedContent = str.slice(start, end);
  const suffix = str.slice(end);
  return { prefix, highlightedContent, suffix };

  // return `${prefix}<span class="highlight">${highlightedContent}</span>${suffix}`
}
</script>

<style lang="stylus">
.search-box {
  display: inline-block;
  position: relative;
  margin-right: 1rem;

  input {
    background-color: var(--vp-c-bg);
    transition: background-color 0.5s;
    cursor: text;
    width: 10rem;
    height: 2rem;
    color: lighten($textColor, 25%);
    display: inline-block;
    border: none;
    font-size: 0.9rem;
    line-height: 2rem;
    padding: 0 0.5rem 0 2rem;
    outline: none;
    transition: all 0.2s ease;
    background-size: 1.2rem;

    &::placeholder {
      transition: color 0.2s ease;
    }

    &:focus {
      cursor: auto;
      border-color: var(--c-brand);

      &::placeholder {
        color: var(--c-brand);
      }

      &~ .search-icon {
        color: var(--c-brand);
      }
    }

    &.focused {
      // border-bottom: 1px solid darken(var(--vp-c-divider-light), 10%);
      // border: 1px solid darken(var(--vp-c-divider-light), 10%);
      // border-radius: 1rem;
    }
  }

  .search-icon {
    color: var(--vp-c-text-2);
    transition: color 0.5s;
    fill: currentColor;
    width: 20px;
    height: 20px;
    position: relative;
    position: absolute;
    top: 5px;
    left: 3px;
    margin-right: 10px;
    cursor: pointer;
  }

  .search-command {
    margin-right: 1rem;
  }

  .suggestions {
    background-color: var(--vp-c-bg);
    min-width: 500px;
    max-width: 700px;
    max-height: 600px;
    position: absolute;
    top: 2rem;
    box-shadow: var(--vp-shadow-3);
    border-radius: 6px;
    padding: 0.4rem;
    list-style-type: none;
    overflow: scroll;

    &.align-right {
      right: 0;
    }
  }

  .suggestion {
    letter-spacing: 0.2px;
    line-height: 1.4;
    // padding 0.4rem 0.6rem
    border-radius: 4px;
    cursor: pointer;
    width: 100%;

    a {
      display: block;
      white-space: normal;
      color: $textColor;
      width: 100%;

      .parent-page-title {
        color: white;
        font-weight: 600;
        background-color: var(--c-brand);
        padding: 5px;
      }

      .suggestion-row {
        border-collapse: collapse;
        width: 100%;
        display: table;

        .page-title {
          font-size: rem;
          width: 35%;
          border: 1px solid $borderColor;
          background: #f5f5f5;
          border-left: none;
          display: table-cell;
          text-align: right;
          padding: 5px;
          font-weight: bolder;
        }

        .suggestion-content {
          .highlight {
            color: #000;
            margin: 0 3px;
            padding: 0 3px;
            border-radius: 3px;
            background: rgba(59, 72, 206, 0.2);
          }

          border: 1px solid $borderColor;
          font-weight: 400;
          border-right: none;
          width: 65%;
          display: table-cell;
          padding: 10px;

          .header {
            font-weight: 600;
          }
        }
      }
    }

    &.focused {
      background-color: #f3f4f5;
    }
  }
}

.dark .search-box .suggestions {
  background: #fff;
}

@media (max-width: $MQNarrow) {
  .search-box {
    input {
      cursor: pointer;
      width: 0;
      border-color: transparent;
      position: relative;

      &:focus {
        cursor: text;
        left: 0;
        width: 10rem;
      }
    }

    .suggestions {
      background-color: ar(--vp-c-bg);
      min-width: 100vw;
      max-width: 100vw;
    }

    .search-command {
      display: none !important;
    }
  }
}

// Match IE11
@media all and (-ms-high-contrast: none) {
  .search-box input {
    height: 2rem;
  }
}

@media (max-width: $MQNarrow) and (min-width: $MQMobile) {
  .search-box {
    .suggestions {
      left: 0;
    }
  }
}

@media (max-width: $MQMobile) {
  .search-box {
    margin-right: 0;

    input {
      left: 1rem;
    }

    .suggestions {
      right: 0;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .search-box {
    .suggestions {
      width: calc(100vw - 4rem);
    }

    input:focus {
      width: 8rem;
    }
  }
}
</style>
