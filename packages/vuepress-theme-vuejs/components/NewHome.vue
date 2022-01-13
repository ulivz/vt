<template>
  <div class="home">
    <section id="hero">
      <!-- tagline -->
      <h1 class="tagline" v-if="data.tagline">
        <span>
          {{ data.tagline || $description || "Welcome to your VuePress site" }}
        </span>
      </h1>
      <Content v-else slot-key="tagline" class="tagline" />

      <p class="description">
        PIA, Abbrev of "Progressive Instant Application", pronounced
        <code>/pɪaɪeɪ/</code>.
      </p>
      <p class="actions">
        <VPLink
          class="get-started"
          text="Get Started"
          :link="$withLocale('/guide/introduction.html')"
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
          class="setup"
          :link="$withLocale('/guide/quick-start/client.html')"
          text="Install"
        />
      </p>
    </section>

    <!-- TODO make dynamic based on data -->
    <section id="special-sponsor">
      <span>Partners</span>
      <a href="#"><img src="/toutiao.webp" /></a>
      <span>Toutiao</span>
      <a href="#"><img src="/tiktok.webp" /></a>
      <span>Tiktok</span>
    </section>

    <section id="highlights" class="vt-box-container">
      <div class="vt-box" v-for="feature in features" :key="feature.title">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
      </div>
    </section>

    <section id="sponsors">
      <!-- TODO -->
    </section>

    <section id="ways-to-use">
      <!-- TODO show toggleable example between CDN vs. SFC usage -->
    </section>

    <section id="tooling">
      <!-- TODO show tooling screenshots -->
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    },
    features() {
      return this.$localePath === "/en/"
        ? [
            {
              title: "Progressive",
              details:
                'Starting from Web standards, combined with "client capabilities" to improve the performance of Web applications Progressively.',
            },
            {
              title: "Performant",
              details:
                "Jump out of Webview to optimize Web performance, such as Prefetch, PreRender, NSR, etc.",
            },
            {
              title: "Business-friendly",
              details:
                "Faced with the performance and user experience issues of business concerns in various scenarios, various capabilities are available out of the box.",
            },
          ]
        : [
            {
              title: "Progressive",
              details:
                "以 Web 标准为起点，结合 “端能力” 渐进式地提升 Web 应用的性能。",
            },
            {
              title: "Performant",
              details:
                "跳出 Webview 来优化 Web 性能，如 Prefetch、PreRender、NSR 等。",
            },
            {
              title: "Business-friendly",
              details:
                "直面各类场景中业务关注的性能和用户体验问题，各类能力开箱即用。",
            },
          ];
    },
  },
};
</script>

<style>
.theme-default-content:not(.custom) > .home {
  margin-top: 0;
}

section {
  padding: 42px 32px;
}

#hero {
  max-width: 1000px;
  margin: 0px auto;
  padding: 10px 0px 76px 0px;
  text-align: left;
}

#hero h1 {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}

.tagline {
  font-size: 62px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
}

.tagline b {
  font-weight: bolder;
  color: var(--c-brand);
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .tagline {
  color: var(--vp-c-green-light);
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 760px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
  font-size: 18px;
  margin: 24px 0px 40px 0px;
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

.actions .get-started {
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

.dark .actions .get-started {
  color: var(--vp-c-indigo);
}

.actions .get-started:hover {
  background-color: var(--c-brand-dark);
  transition-duration: 0.2s;
  color: #fff;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.dark .actions .get-started:hover {
  background-color: var(--vp-c-green-light);
}

.actions .setup {
  color: var(--vp-c-text-code);
}

.actions .setup:hover {
  background-color: var(--vp-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .setup:hover {
  background-color: var(--vp-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vp-c-divider-light);
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding: 12px 24px;
  text-align: center;
}

#special-sponsor span {
  color: var(--vp-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  margin: 0 24px;
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
  .tagline {
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
  }
  .tagline {
    font-size: 38px;
  }
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  #special-sponsor img {
    display: block;
    margin: 2px auto 1px;
  }
  #highlights h3 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
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
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .vt-box-container .vt-box {
    flex: 0 100%;
    margin-bottom: 20px;
  }
}
</style>
