<template>
  <Sticker class="vuepress-toc" v-bind="$attrs" v-if="visible">
    <div class="on-this-page">ON THIS PAGE</div>
    <div
      class="vuepress-toc-item"
      ref="chairTocItem"
      :class="[
        `vuepress-toc-h${item.level}`,
        { active: activeIndex === index },
      ]"
      v-for="(item, index) in $page.headers"
      :key="index"
    >
      <a :href="`#${item.slug}`" :title="item.title">{{ item.title }}</a>
    </div>
  </Sticker>
</template>

<script>
import Sticker from "./Sticker.vue";
let initTop;

// get offset top
function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0;
}

export default {
  components: {
    Sticker,
  },

  data() {
    return {
      activeIndex: 0,
    };
  },

  computed: {
    visible() {
      return (
        this.$frontmatter &&
        this.$frontmatter.toc !== false &&
        !!(this.$page && this.$page.headers && this.$page.headers.length)
      );
    },
  },

  watch: {
    activeIndex() {
      const items = this.$refs.chairTocItem || [];
      const dom = items[this.activeIndex];
      if (!dom) return;
      const rect = dom.getBoundingClientRect();
      const wrapperRect = this.$el.getBoundingClientRect();
      const top = rect.top - wrapperRect.top;
      if (top < 20) {
        this.$el.scrollTop = this.$el.scrollTop + top - 20;
      } else if (top + rect.height > wrapperRect.height) {
        this.$el.scrollTop += rect.top - (wrapperRect.height - rect.height);
      }
    },

    $route() {},
  },

  methods: {
    onScroll() {
      if (initTop === undefined) {
        initTop = getAbsoluteTop(this.$el);
      }

      // update position
      const scrollTop =
        document.body.scrollTop + document.documentElement.scrollTop;
      const headings = this.$page.headers || [];

      // change active toc with scrolling
      let i = 0;
      const addLink = (index) => {
        this.activeIndex = index;
      };

      for (; i < headings.length; i++) {
        const dom = document.getElementById(headings[i].slug);
        const top = getAbsoluteTop(dom);
        if (top - 50 < scrollTop) {
          addLink(i);
        } else {
          if (!i) addLink(i);
          break;
        }
      }
    },

    triggerEvt() {
      this._onScroll();
      this._onHashChange();
    },
  },

  mounted() {
    // sync visible to parent component
    const syncVisible = () => {
      this.$emit("visible-change", this.visible);
    };
    syncVisible();
    this.$watch("visible", syncVisible);

    // binding event
    setTimeout(() => this.triggerEvt(), 1000);

    this._onScroll = () => this.onScroll();
    this._onHashChange = () => {
      const hash = decodeURIComponent(location.hash.substring(1));
      const index = (this.$page.headers || []).findIndex(
        (h) => h.slug === hash
      );
      if (index >= 0) this.activeIndex = index;
      const dom = hash && document.getElementById(hash);
      if (dom) window.scrollTo(0, getAbsoluteTop(dom) - 20);
    };
    window.addEventListener("scroll", this._onScroll);
    // window.addEventListener('hashchange', this._onHashChange);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("hashchange", this._onHashChange);
  },
};
</script>

<style lang="stylus">
@require '../styles/config';
  
.on-this-page {
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.4px;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.table-of-contents {
  display: none !important;
}

.vuepress-toc {
  position: fixed;
  display: none;
  max-height: 100vh;
  overflow-y: auto;
  padding-top: $navbarHeight;
  padding-bottom: 150px;
  top: 100px;
  right: 100px;
  box-sizing: border-box;
  /* background: #fff; */
  z-index: 0;

  .vuepress-toc-item {
    position: relative;
    padding: 0.1rem 0.6rem 0.1rem 1.5rem;
    line-height: 1.5rem;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    overflow: hidden;

    a {
      display: block;
      color: var(--vp-c-text-2);
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      font-weight: 400;
      text-decoration: none;
      transition: color 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.active {
      border-left-color: var(--c-brand);

      a {
        color: var(--c-brand);
        font-weight: 500;
      }
    }

    &:hover {
      a {
        color: var(--c-brand);
      }
    }
  }

  for i in range(3, 6) {
    .vuepress-toc-h{i} a {
      padding-left: 1rem * (i - 2);
    }
  }
}

.vuepress-toc {
  max-width: var(--vp-toc-width);
  right: calc((100vw - var(--vp-screen-max-width)) / 4)
}

// for vuepress-toc
@media (min-width: $MQDesktop) {
  .vuepress-toc {
    display: block;
  }
}
</style>
