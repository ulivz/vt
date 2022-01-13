<template>
  <VPLink class="next-step" text="" :link="$withLocale(href)">
    <template slot="after">
      <p class="next-steps-link">{{ title }}</p>
      <p class="next-steps-caption">{{ description }}</p>
    </template>
  </VPLink>
</template>

<script>
export default {
  props: ["href", "title", "description"],
};
</script>

<style>
.next-step {
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  transition: color 0.5s, background-color 0.5s;
  padding: 28px 36px;
  border-radius: 8px;
  flex: 0 32%;
  font-size: 14px;
  font-weight: 500;
}

.next-step:hover {
  border-color: var(--c-brand);
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.next-steps-link {
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  margin-top: 0;
  margin-bottom: 0.75em;
  display: block;
  color: var(--c-brand);
}

.next-steps-caption {
  margin-bottom: 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

@media (max-width: 768px) {
  .next-step {
    flex: 0 100%;
    margin-bottom: 20px;
  }
}
</style>