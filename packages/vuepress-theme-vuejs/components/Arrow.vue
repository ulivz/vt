<script>
import VPIconChevronRight from "./icons/VPIconChevronRight.vue";
import VPIconChevronDown from "./icons/VPIconChevronDown.vue";

export default {
  functional: true,

  props: ["open"],

  render(h, { props: { open } }) {
    return h(open ? VPIconChevronDown : VPIconChevronRight, {
      class: "arrow-icon",
    });
  },
};
</script>

<style>
.arrow-icon {
  fill: currentColor;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
}
</style>