<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: "tip",
    },
    text: String,
    vertical: {
      type: String,
      default: "top",
    },
  },
  render(h, { props, slots }) {
    const badgeIcon =
      ["warning", "warn", "error"].indexOf(props.type) > -1 ? "⚠" : "ⓘ";
    return h(
      "span",
      {
        class: ["badge", props.type],
        style: {
          verticalAlign: props.vertical,
        },
      },
      [
        h("span", { class: ["badge-icon"] }, badgeIcon),
        h("span", { class: ["badge-text"] }, props.text || slots().default),
      ]
    );
  },
};
</script>

<style lang="stylus" scoped>
.badge {
  display: inline-block;
  height: 22px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0 5px;
  color: var(--vp-c-text-code);
  background-color: var(--vp-c-bg-soft);
  font-size: 0;

  .badge-icon {
    display: inline-block;
    margin-right: 5px;
    font-size: 16px;
    // font-weight: bolder;
  }

  .badge-text {
    font-size: 16px;
    font-weight: 400;
    vertical-align: baseline;
  }

  &.tip, &.green {
    border: 1px solid rgb(178, 186, 194);
  }

  &.error {
    color: var(--vp-c-red-dark);
    border: 1px solid var(--vp-c-red);
  }

  &.warning, &.warn, &.yellow {
    color: var(--vp-c-yellow-dark);
    border: 1px solid var(--vp-c-yellow);
  }

  & + & {
    margin-left: 5px;
  }
}

.dark {
  .badge {
    &.tip, &.green {
      color: var(--c-brand);
      border: 1px solid var(--c-brand);
    }
  }
}
</style>
