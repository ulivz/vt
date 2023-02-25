<template>
  <RouterLink :to="$localePath" class="home-link">
    <img
      v-if="$site.themeConfig.logo"
      class="logo"
      :src="$withBase($site.themeConfig.logo)"
      :alt="$siteTitle"
    />
    <span
      v-if="$siteTitle"
      ref="siteName"
      class="site-name"
      :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span
    >
  </RouterLink>
</template>

<style lang="stylus">
.home-link {
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  background-color: var(--vp-c-bg);
  min-width: var(--vp-sidebar-width);
  padding-left: calc(((100vw - var(--vp-screen-max-width)) / 2));
  box-sizing: content-box;
  background-color: var(--vp-c-bg-soft);
  flex: 0;
}

.logo {
  height: 1.4rem;
  min-width: 1.4rem;
  margin-right: 0.2rem;
}

.site-name {
  font-size: 22px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  position: relative;
}

@media (max-width: $MQMobile) {
  .site-name {
    width: calc(100vw - 9.4rem);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .home-link {
    background-color: transparent;
  }
}
</style>