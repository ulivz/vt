<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0 && depth !== 1,
      },
      `depth-${depth}`,
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <Arrow v-if="collapsable" :open="open" />
    </RouterLink>

    <p
      v-else
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <Arrow v-if="collapsable" :open="open" />
    </p>

    <DropdownTransition>
      <transition name="sidebar-group-fade">
        <SidebarLinks
          v-if="open || !collapsable"
          class="sidebar-group-items"
          :items="item.children"
          :sidebar-depth="item.sidebarDepth"
          :initial-open-group-index="item.initialOpenGroupIndex"
          :depth="depth + 1"
        />
      </transition>
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from "../lib/util";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import Arrow from "@theme/components/Arrow.vue";

export default {
  name: "SidebarGroup",

  components: {
    DropdownTransition,
    Arrow,
  },

  props: ["item", "open", "collapsable", "depth"],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks =
      require("@theme/components/SidebarLinks.vue").default;
  },

  methods: { isActive },
};
</script>

<style lang="stylus">
@require '../styles/mixins.styl';

.sidebar-group {
  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      font-size: 0.95em;
      line-height: 1.4;
      font-weight: normal;
      padding-left: 1rem;

      &:not(.clickable) {
        opacity: 0.5;
      }
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 0.95em;
        border-left: none;
      }
    }
  }

  &.depth-0 {
    & > .sidebar-heading {
      font-weight: bold;
    }
  }

  &.depth-1 {
    .sidebar-links {
      padding-left: 1rem;
    }

    & > .sidebar-heading {
      &:hover {
        sidebar-active-bg();
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}

.sidebar-heading {
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
  // text-transform uppercase
  padding: 0.35rem 1.5rem 0.35rem 0rem;
  width: 100%;
  box-sizing: border-box;
  margin: 1px 0;
  cursor: pointer;

  // border-left 0.25rem solid transparent
  &.open, &:hover {
    color: inherit;
  }

  .arrow {
    position: relative;
    top: -0.12em;
    left: 0.5em;
  }

  &.clickable {
    &.active {
      font-weight: 500;
      color: var(--vp-c-brand);
      border-left-color: var(--vp-c-brand);
    }

    &:hover {
      color: var(--vp-c-brand);
    }
  }
}

.sidebar-group-items {
  font-size: 0.95em;
}

.sidebar-group-fade-enter-active, .sidebar-group-fade-leave-active {
  transition: height 0.2s ease-in;
}

.sidebar-group-fade-enter, .sidebar-group-fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>
