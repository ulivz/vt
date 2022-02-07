<template>
  <div class="code-switcher">
    <div class="tab-header">
      <ul>
        <li
          v-for="(name, shorthand) in actualLanguages"
          :key="shorthand"
          @click="switchLanguage(shorthand)"
          :class="{ active: selectedLanguage === shorthand }"
        >
          {{ name }}
        </li>
      </ul>
    </div>

    <div
      class="tab-content"
      :key="shorthand"
      v-for="(name, shorthand) in actualLanguages"
      v-show="shorthand === selectedLanguage"
    >
      <slot :name="shorthand"></slot>
    </div>
  </div>
</template>

<script>
// see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
import codeSwitcherGroups from "@dynamic/code-switcher-groups";
console.log("codeSwitcherGroups", codeSwitcherGroups);

export default {
  props: {
    name: {
      type: String,
      default: "default",
    },
    isolated: {
      type: Boolean,
      default: true,
    },
    languages: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      selectedLanguage: this.languages ? Object.keys(this.languages)[0] : null,
      actualLanguages: this.languages,
    };
  },

  computed: {
    root() {
      let parent = this,
        p;
      while ((p = parent.$parent)) {
        parent = p;
      }

      return parent;
    },

    localStorageKey() {
      return `vuepress-plugin-code-switcher@${this.name}`;
    },
  },

  methods: {
    switchLanguage(value) {
      if (this.isolated) {
        return (this.selectedLanguage = value);
      }

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.localStorageKey, value);
      }
      this.root.$emit("change", { name: this.name, value });
    },

    setConfiguredDefaultLanguages() {
      // No need to override the language list if we already have manually
      // specified languages
      if (this.languages) return;

      if (codeSwitcherGroups && codeSwitcherGroups[this.name]) {
        this.actualLanguages = codeSwitcherGroups[this.name];
        this.selectedLanguage = Object.keys(this.actualLanguages)[0];
      }
    },
  },

  created() {
    this.setConfiguredDefaultLanguages();

    if (this.isolated) return;

    if (!this.actualLanguages) {
      throw new Error(
        'You must specify either the "languages" prop or use the "groups" option when configuring the plugin.'
      );
    }

    if (typeof localStorage !== "undefined") {
      let selected = localStorage.getItem(this.localStorageKey);
      if (
        selected &&
        Object.keys(this.actualLanguages).indexOf(selected) !== -1
      )
        this.selectedLanguage = selected;
    }

    this.root.$on("change", ({ name, value }) => {
      debugger;
      if (name === this.name) this.selectedLanguage = value;
    });
  },
};
</script>

<style lang="stylus">
$border = 1.5px;

.code-switcher {
  div[class*='language-']::before {
    content: '';
  }

  .tab-header {
    ul {
      padding: 0;
      text-align: center;
      margin-bottom: -5px;
      margin-top: 20px;
    }

    li {
      box-sizing: content-box;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: var(--vp-c-text-2);
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      border: $border solid var(--vp-c-divider);
      border-right: none;
      // transition: all 0.1s ease-in-out;

      &:before {
        display: none;
      }

      &:first-child {
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }

      &:last-child {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-right: $border solid var(--vp-c-divider);
      }

      &:hover {
        background-color: var(--vp-c-bg-soft);
      }

      &.active {
        border: $border solid var(--c-brand-light);
        background-color: var(--vp-c-bg-soft);

        & ~ li {
          border-left: none;
        }
      }
    }
  }
}
</style>
