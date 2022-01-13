<template>
  <span class="search-command-wrapper">
    <span class="search-command-char">⌘</span>
    <span class="search-command-char">K</span>
  </span>
</template>

<script>
export default {
  mounted() {
    const handleSearchHotKey = (e) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        this.$emit('onCommand');
        // remove();
      }
    };
    const remove = () => {
      window.removeEventListener("keydown", handleSearchHotKey);
    };
    window.addEventListener("keydown", handleSearchHotKey);
  },
};
</script>

<style>
.search-command-wrapper {
  --search-primary-color: var(--vp-c-brand);
  --search-highlight-color: var(--search-primary-color);
  --search-text-color: var(--vp-c-text-1);
  --search-muted-color: var(--vp-c-text-2);
  --search-searchbox-shadow: none;
  --search-searchbox-focus-background: transparent;
  --search-key-gradient: transparent;
  --search-key-shadow: none;
  --search-modal-background: var(--vp-c-bg-soft);
  --search-footer-background: var(--vp-c-bg);
}

.dark .search-command-wrapper {
  --search-modal-shadow: none;
  --search-footer-shadow: none;
  --search-logo-color: var(--vp-c-text-2);
  --search-hit-background: var(--vp-c-bg-mute);
  --search-hit-color: var(--vp-c-text-2);
  --search-hit-shadow: none;
}

.search-command-wrapper {
  font-size: 0;
}

.search-command-char:nth-child(1) {
  padding-left: 6px;
}

.search-command-char {
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition: color 0.5s;
  display: inline-block;
  width: 20px;
  margin-top: 2px;
  border: 1px solid var(--vp-c-divider);
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  padding-right: 1px;
  height: 20px;
  line-height: 20px;
  transition: color 0.5s, border-color 0.5s;
  min-width: 0;
}

.search-command-char:nth-child(2) {
  border-right: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding-left: 3px;
  padding-right: 6px;
}

.DocSearch-Button:hover .search-command-char {
  border-color: var(--vp-c-brand-light);
  color: var(--vp-c-brand-light);
}

@media (max-width: 768px) {
  .search-command-wrapper {
    display: none;
  }
}

@media (min-width: 768px) {
  .search-command-char {
    display: inline-block;
  }
}
</style>

