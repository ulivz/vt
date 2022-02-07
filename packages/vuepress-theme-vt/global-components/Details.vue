<template>
  <details class="pia-details">
    <slot />
  </details>
</template>

<style lang="stylus">
.pia-details {
  cursor: pointer;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--c-brand-light);
  padding: 20px 24px;
  border-radius: 8px;

  &::marker {
    color: red;
  }

  &[open] {
    summary .pia-summary-guide:before {
      content: 'Click to collapse';
    }

    summary::marker {
      content: '⤴️';
    }
  }

  & pre {
    border: 1px solid var(--vp-c-divider-light);
  }

  & > p {
    margin-bottom: 0;
  }
}
</style>