<template>
  <svg
    style="display: block"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    role="presentation"
  >
    <g :transform="`scale(${size / 100})`">
      <clock-face />
      <short-hand :time="time" />
      <long-hand :time="time" />
      <second-hand :time="time" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ClockFace from "./ClockFace.vue";
import ShortHand from "./ShortHand.vue";
import LongHand from "./LongHand.vue";
import SecondHand from "./SecondHand.vue";

export default defineComponent({
  props: {
    time: { type: Number, default: 0 },
    size: { type: Number, default: 240 },
  },
  components: {
    ClockFace,
    ShortHand,
    LongHand,
    SecondHand,
  },
});
</script>
