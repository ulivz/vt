<script>
import VTSwitch from "./VTSwitch.vue";
import VTIconSun from "./icons/VTIconSun.vue";
import VTIconMoon from "./icons/VTIconMoon.vue";

const storageKey = "--pia-theme-appearance--";

export default {
  components: {
    VTSwitch,
    VTIconSun,
    VTIconMoon,
  },
  data() {
    return {
      isDark: false,
    };
  },
  created() {
    if (typeof window !== "undefined") {
      this.userPreference = localStorage.getItem(storageKey) || "auto";
      this.query = window.matchMedia(`(prefers-color-scheme: dark)`);
      this.isDark =
        this.userPreference === "auto"
          ? this.query.matches
          : this.userPreference === "dark";

      this.query.onchange = (e) => {
        if (this.userPreference === "auto") {
          this.setClass((this.isDark = e.matches));
        }
      };

      this.setClass(this.isDark);
    }
  },
  methods: {
    setClass(dark) {
      console.log("dark", dark);

      const classList = document.documentElement.classList;
      classList[dark ? "add" : "remove"]("dark");
    },
    toggle() {
      this.setClass((this.isDark = !this.isDark));
      localStorage.setItem(
        storageKey,
        (this.userPreference = this.isDark
          ? this.query.matches
            ? "auto"
            : "dark"
          : this.query.matches
          ? "light"
          : "auto")
      );
    },
  },
};
</script>

<template>
  <VTSwitch
    class="vt-switch-appearance"
    aria-label="toggle dark mode"
    @click.native="toggle"
  >
    <VTIconSun class="vt-switch-appearance-sun" />
    <VTIconMoon class="vt-switch-appearance-moon" />
  </VTSwitch>
</template>

<style>
.vt-switch-appearance-sun {
  opacity: 1;
}
.vt-switch-appearance-moon {
  opacity: 0;
}

.dark .vt-switch-appearance-sun {
  opacity: 0;
}
.dark .vt-switch-appearance-moon {
  opacity: 1;
}

.dark .vt-switch-appearance .vt-switch-check {
  transform: translateX(18px);
}
</style>