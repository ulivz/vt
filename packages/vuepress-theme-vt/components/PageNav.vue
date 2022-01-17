<template>
  <div v-if="prev || next" class="page-nav">
    <div class="inner">
      <VPLink
        v-if="prev"
        :class="['prev', prev.class]"
        :text="prev.title || prev.path"
        :link="prev.path"
      >
        <span slot="before">←</span>
        <span slot="after">
          <br />
          <span class="prev-link">{{ prev.path }}</span>
        </span>
      </VPLink>

      <VPLink
        v-if="next"
        :class="['next', next.class]"
        :text="next.title || next.path"
        :link="next.path"
      >
        <span slot="after">
          →
          <br />
          <span class="next-link">{{ next.path }}</span>
        </span>
      </VPLink>
    </div>
  </div>
</template>

<script>
import { resolvePage } from "../lib/util";
import isString from "lodash/isString";
import isNil from "lodash/isNil";

const noopPlaceholder = {
  title: "N/A",
  path: "N/A",
  class: "noop",
};
export default {
  name: "PageNav",

  props: ["sidebarItems"],

  computed: {
    prev() {
      return resolvePageLink(LINK_TYPES.PREV, this) || noopPlaceholder;
    },

    next() {
      return resolvePageLink(LINK_TYPES.NEXT, this) || noopPlaceholder;
    },
  },
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next,
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev,
  },
};

function resolvePageLink(
  linkType,
  { $themeConfig, $page, $route, $site, sidebarItems }
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType;

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig);

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page);

  // Page link config will overwrite global theme link config if defined
  const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig;

  if (link === false) {
    return;
  } else if (isString(link)) {
    return resolvePage($site.pages, link, $route.path);
  } else {
    return resolveLink($page, sidebarItems);
  }
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;

  .inner {
    padding-top: 1rem;
    border-top: 1px solid var(--vp-c-divider-light);
    display: flex;
    justify-content: space-between;
  }

  .prev, .next {
    cursor: pointer;
    overflow: hidden;
    min-height: 2rem;
    margin-top: 0;
    max-width: 300px;
    padding-top: 1rem;
    background-color: var(--vp-c-bg-soft);
    transition: color 0.5s, background-color 0.5s;
    padding: 16px 20px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    border: 1px solid var(--vp-c-bg-soft);

    &.noop {
      visibility: hidden;
    }

    &:hover {
      border-color: var(--c-brand);
      transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

      & span {
        color: var(--vp-c-text-2);
        transition: color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
    }
  }

  .next {
    text-align: right;
  }

  .prev-link, .next-link {
    font-size: 12px;
    display: inline-block;
    margin-top: 10px;
    color: var(--vp-c-text-3);
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media (max-width: $MQMobile) {
  .page-nav {
    .prev, .next {
      width: 160px;
      max-width: 160px;
    }
  }
}
</style>
