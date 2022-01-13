<template>
  <div class="sidebar-button" @click="$emit('toggle-sidebar')">
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
        class=""
      />
    </svg>
  </div>
</template>

<style lang="stylus">
.sidebar-button {
  cursor: pointer;
  display: none;
  width: 3rem;
  height: 100%;
  flex: 0 0 3rem;
  padding-left: 1rem;
  align-items: center;
  margin-right: -0.5rem;

  .icon {
    display: block;
    width: 1rem;
    height: 1rem;
  }
}

@media (max-width: $MQMobile) {
  .sidebar-button {
    display: flex;
  }
}
</style>
