<template>
  <div class="home">
    <section id="hero">
      <!-- heroImage -->
      <img
        class="hero-img"
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      />
      <br />

      <!-- heroText -->
      <h1 class="heroText" v-if="data.heroText">
        <span>
          {{ data.heroText || $description || "Welcome to your VuePress site" }}
        </span>
      </h1>
      <Content v-else slot-key="heroText" class="heroText" />

      <!-- tagline -->
      <p class="tagline" v-if="data.tagline">
        {{ data.tagline }}
      </p>
      <Content v-else slot-key="tagline" class="tagline" />

      <!-- actions -->
      <p class="actions">
        <VPLink
          v-if="data.actionText && data.actionLink"
          class="action-link"
          :text="data.actionText"
          :link="data.actionLink"
        >
          <svg
            slot="after"
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
            />
          </svg>
        </VPLink>
        <VPLink
          v-if="data.subActionText && data.subActionLink"
          class="sub-action-link"
          :text="data.subActionText"
          :link="data.subActionLink"
        />
      </p>
    </section>

    <!-- special sponsor -->
    <section id="special-sponsor" v-show="data.sponsors">
      <span class="special-sponsor-title">{{
        data.sponsorsText || "Special Sponsor"
      }}</span>
      <span
        class="special-sponsor-item"
        v-for="sponsor in data.sponsors"
        :key="sponsor.title"
      >
        <span>{{ sponsor.title }}</span>
        <a :href="sponsor.link"><img :src="sponsor.img" /></a>
      </span>
    </section>

    <!-- features -->
    <section v-if="data.features" id="highlights" class="vt-box-container">
      <div class="vt-box" v-for="feature in data.features" :key="feature.title">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
      </div>
    </section>

    <!-- footer -->
    <div v-if="data.footer" class="footer">
      {{ data.footer }}
    </div>
    <Content v-else slot-key="footer" class="footer" />
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="stylus" scoped>
.theme-default-content:not(.custom) > .home {
  margin-top: 0;
}

section {
  padding: 42px 32px;
}

#hero {
  max-width: 1000px;
  margin: 50px auto 0 auto;
  padding: 76px 0px 76px 0px;
  text-align: center;
}

#hero {
  h1 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }

  .hero-img {
    max-width: 200px;
    max-height: 280px;
  }

  .heroText {
    font-size: 76px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    display: inline-block;
    margin-bottom: 20px;
  }

  .tagline {
    display: inline-block;
    max-width: 960px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
    font-size: 22px;
    margin: 24px auto 40px;
  }
}

.dark .heroText {
  color: var(--c-brand-light);
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vp-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .action-link {
  font-weight: 600;
  background-color: var(--c-brand);
  color: #fff;
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.dark .actions .action-link {
  color: var(--vp-c-indigo);
}

.actions .action-link:hover {
  background-color: var(--c-brand-dark);
  transition-duration: 0.2s;
}

.actions .action-link:hover .icon {
  transform: translateX(2px);
}

.dark .actions .action-link:hover {
  background-color: var(--c-brand-light);
}

.actions .sub-action-link {
  color: var(--vp-c-text-code);
}

.actions .sub-action-link:hover {
  background-color: var(--vp-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .sub-action-link:hover {
  background-color: var(--vp-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vp-c-divider-light);
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 12px 24px;
  text-align: center;

  .special-sponsor-title {
    margin: 0;
  }
}

#special-sponsor span {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 20px;
}

#special-sponsor img {
  display: inline-block;
  vertical-align: middle;
  height: 36px;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vp-c-text-2);
}

#highlights h3 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vp-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

@media (max-width: 768px) {
  .heroText {
    font-size: 48px;
    letter-spacing: -0.5px;
  }

  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 576px) {
  .home {
    padding: 0;
  }

  #hero {
    padding: 64px 10px;

    .heroText {
      font-size: 58px;
    }
  }

  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }

  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }

  #special-sponsor .special-sponsor-title {
    display: block;
    margin: 0 0 10px 0;
    font-weight: bolder;
  }

  #special-sponsor span {
    margin: 0;
  }

  #highlights h3 {
    margin-bottom: 0.6em;
  }

  #highlights .vt-box {
    padding: 20px 36px;
  }
}

@media (max-width: 370px) {
  #hero {
    .heroText {
      font-size: 36px;
    }
  }
}

.vt-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.vt-box-container .vt-box {
  background-color: var(--vp-c-bg-soft);
  transition: color 0.5s, background-color 0.5s;
  padding: 28px 36px;
  border-radius: 8px;
  flex: 0 32%;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .vt-box-container .vt-box {
    flex: 0 100%;
    margin-bottom: 20px;
  }
}

.footer {
  text-align: center;
  font-size: 12px;
}
</style>
