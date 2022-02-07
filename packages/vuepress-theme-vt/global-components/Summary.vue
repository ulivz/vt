<template>
  <summary class="pia-summary">
    <span class="pia-summary-divider"></span
    ><span class="pia-summary-guide"></span>&nbsp; <slot />
  </summary>
</template>

<style lang="stylus" scoped>
.pia-summary-divider {
  display: inline-block;
  margin-right: 4px;
}

.pia-summary-guide {
  opacity: 0.8;
  font-style: italic;
  color: var(--c-brand);

  &:before {
    content: 'Click to expand'
  }
}

.pia-summary {
  font-size: 0.8em;
  outline: none;

  &::marker {
    color: var(--c-brand);
    content: '▶️';
    font-weight: bolder;
  }
}
</style>