<script>
import { isActive, hashRE, groupHeaders } from "../lib/util";

export default {
  functional: true,

  props: ["item", "sidebarDepth"],

  render(
    h,
    {
      parent: { $page, $site, $route, $themeConfig, $themeLocaleConfig },
      props: { item, sidebarDepth },
    }
  ) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path);
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active =
      item.type === "auto"
        ? selfActive ||
          item.children.some((c) =>
            isActive($route, item.basePath + "#" + c.slug)
          )
        : selfActive;
    const link =
      item.type === "external"
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active);

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      0,
    ].find((depth) => depth !== undefined);

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    if (item.type === "auto") {
      return [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth),
      ];
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers);
      return [link, renderChildren(h, children, item.path, $route, maxDepth)];
    } else {
      return link;
    }
  },
};

function renderLink(h, to, text, active, level) {
  const component = {
    props: {
      to,
      activeClass: "",
      exactActiveClass: "",
    },
    class: {
      active,
      "sidebar-link": true,
    },
  };

  if (level > 2) {
    component.style = {
      "padding-left": level + "rem",
    };
  }

  return h("RouterLink", component, text);
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h(
    "ul",
    { class: "sidebar-sub-headers" },
    children.map((c) => {
      const active = isActive(route, path + "#" + c.slug);
      return h("li", { class: "sidebar-sub-header" }, [
        renderLink(h, path + "#" + c.slug, c.title, active, c.level - 1),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1),
      ]);
    })
  );
}

function renderExternal(h, to, text) {
  return h(
    "a",
    {
      attrs: {
        href: to,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      class: {
        "sidebar-link": true,
      },
    },
    [text, h("VPIconExternalLink")]
  );
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers {
  padding-left: 1rem;
  font-size: 0.95em;
}

a.sidebar-link {
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
  color: var(--vp-c-text-2);
  padding: 0.35rem 1rem 0.35rem 0rem;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
  transition: color 0.3s;

  &:hover {
    color: var(--c-brand);
  }

  &.active {
    font-weight: 600;
    color: var(--c-brand);
  }

  .sidebar-group & {
    padding-left: 0rem;
  }

  .sidebar-sub-headers & {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-left: none;

    &.active {
      font-weight: 500;
    }
  }
}

.sidebar-sub-header .sidebar-link {
  font-size: 12px;
  font-weight: 400;
}
</style>
