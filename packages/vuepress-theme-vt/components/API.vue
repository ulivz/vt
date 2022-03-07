<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  created() {
    this.apiIndex = [];
  },
  computed: {
    apiGroups() {
      const sidebarConfig =
        this.$themeLocaleConfig.sidebar || this.$themeConfig.sidebar;

      if (typeof sidebarConfig === "object") {
        const apiPath = this.$localePath + "api/";

        const apiConfigs = sidebarConfig[apiPath];
        if (apiConfigs[0].path === apiPath) {
          return apiConfigs
            .filter((group) => group.children)
            .map((group) => {
              return {
                text: group.title,
                description: group.description,
                items: group.children.map((item) => {
                  const page = this.$site.pages.find(
                    (page) => page.regularPath === item + ".html"
                  );
                  return {
                    pageClass: page.frontmatter?.pageClass,
                    text: page.title,
                    link: page.path,
                    headers: (page.headers || []).filter(
                      (header) => header.level === 2 || header.level === 3
                    ),
                  };
                }),
              };
            });
        }
      }

      return [];
    },
    filtered() {
      const q = this.query;
      return this.apiGroups
        .map((section) => {
          const items = section.items
            .map(({ text, link, headers, pageClass }) => {
              headers = headers.filter((h) => {
                return h.slug.toLowerCase().includes(q.toLowerCase());
              });
              return headers.length ? { text, link, headers, pageClass } : null;
            })
            .filter((i) => i);
          return items.length
            ? {
                text: section.text,
                id: section.text.replace(/\s+/g, "-"),
                description: section.description,
                pageClass: section.pageClass,
                items,
              }
            : null;
        })
        .filter((i) => i);
    },
  },
};
</script>

<template>
  <div id="api-index">
    <div class="header">
      <h1>API Reference</h1>
      <input class="api-filter" placeholder="Filter" v-model="query" />
    </div>

    <div v-for="section of filtered" class="api-section" :key="section.id">
      <h2 :id="section.id">
        {{ section.text }}
        <a class="header-anchor" :href="'#' + section.id" aria-hidden="true"
          >#</a
        >
      </h2>
      <div
        v-if="section.description"
        class="tip custom-block api-section-description"
      >
        <p v-html="section.description"></p>
      </div>
      <div class="api-groups">
        <div v-for="item of section.items" class="api-group" :key="item.text">
          <h3>{{ item.text }}</h3>
          <ul
            :class="{
              'api-group-ul': true,
              [item.pageClass]: !!item.pageClass,
            }"
          >
            <li
              v-for="h of item.headers"
              :class="{
                'api-group-li': true,
                [`level-${h.level}`]: true,
              }"
              :key="h.slug"
            >
              <VPLink :text="h.title" :link="item.link + '#' + h.slug" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
*, ::before, ::after {
  box-sizing: border-box;
}

html {
  line-height: 1.4;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  line-height: 1.4;
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: 400;
  color: var(--c-text);
  background-color: var(--c-bg);
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#api-index {
  max-width: 1024px;
  margin: 0px auto;
  padding: 64px 32px;
}

h1, h2, h3 {
  font-weight: 600;
  line-height: 1;
}

h1, h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 38px;
}

h2 {
  font-size: 24px;
  color: var(--vp-c-text-1);
  margin: 36px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider-light);
}

h3 {
  letter-spacing: -0.01em;
  color: var(--c-brand);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
  margin: 0rem;
}

h3:before {
  display: none;
}

h1:hover .header-anchor, h1:focus .header-anchor, h2:hover .header-anchor, h2:focus .header-anchor, h3:hover .header-anchor, h3:focus .header-anchor, h4:hover .header-anchor, h4:focus .header-anchor, h5:hover .header-anchor, h5:focus .header-anchor, h6:hover .header-anchor, h6:focus .header-anchor {
  opacity: 1;
}

.api-section {
  margin-bottom: 64px;
}

.api-section-description {
  margin: 28px 0;
  padding: 20px 24px 4px 42px;
  border-radius: 8px;
  overflow-x: auto;
  transition: color 0.5s, background-color 0.5s;
  position: relative;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand);
}

.api-section-description:before {
  color: var(--vp-c-brand);
  content: '\24d8';
  position: absolute;
  font-weight: 600;
  font-size: 15px;
  top: 20px;
  left: 17px;
}

:global(.api-section-description p > span) {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  color: transparent;
  -webkit-box-decoration-break: clone;
}

:global(.api-section-description p) {
  margin-bottom: 1.2em;
}

.api-groups a {
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: var(--vp-c-text-code);
  transition: color 0.5s;
}

.api-group-ul {
  list-style: none;
}

.api-group-li {
  position: relative;

  &.level-3 {
    padding-left: 1rem;

    &:before {
      left: -0.25rem;
    }
  }
}

.api-group-li:before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(60, 60, 60, 0.33);
  transition: background-color 0.5s;
  left: -1.25rem;
  top: 0.9rem;
}

.dark api-groups a {
  font-weight: 400;
}

.api-groups a:hover {
  color: var(--c-brand);
  transition: none;
}

.api-group {
  break-inside: avoid;
  margin-bottom: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 28px 32px;
  transition: background-color 0.5s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.api-filter {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
}

.api-filter:focus {
  border-color: var(--vp-c-green-light);
}

@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 22px;
    margin: 42px 0 32px;
    padding-top: 32px;
  }

  .api-groups a {
    font-size: 14px;
  }

  .header {
    display: block;
  }
}

@media (min-width: 768px) {
  .api-groups {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .api-groups {
    columns: 3;
  }
}

a.header-anchor {
  float: left;
  margin-top: 0.125em;
  margin-left: -0.87em;
  padding-right: 0.23em;
  font-size: 0.85em;
  opacity: 0;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;
  text-decoration-style: dotted;
}

a.header-anchor:hover, a.header-anchor:focus {
  text-decoration: none;
}
</style>
