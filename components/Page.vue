<template>
  <main :class="['page', isHomepage ? 'homepage' : '', pageName]">
    <slot name="top" />

    <Content class="theme-default-content vp-doc" />

    <PageEdit v-if="this.$page.frontmatter.pageEdit !== false" />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
  computed: {
    isHomepage() {
      return this.$route.path === this.$localeConfig.path;
    },
    pageName() {
      return this.$route.path.replace(/\//g, '')
    }
  },
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.vp-doc {
  scroll-padding: 100px;
}

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>
