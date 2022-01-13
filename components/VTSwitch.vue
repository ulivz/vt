<template>
  <button class="vt-switch" type="button">
    <span class="vt-switch-check">
      <span class="vt-switch-icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<style>
.vt-switch {
  position: relative;
  border-radius: 11px;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-mute);
  transition: border-color 0.25s, background-color 0.25s;
}

.vt-switch:hover {
  border-color: var(--vp-c-gray);
}

.vt-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-white);
  box-shadow: var(--vp-shadow-1);
  transition: background-color 0.25s, transform 0.25s;
}

.dark .vt-switch-check {
  background-color: var(--vp-c-black);
}

.vt-switch-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.vt-switch-icon svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: var(--vp-c-text-2);
}

.dark .vt-switch-icon svg {
  fill: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

</style>