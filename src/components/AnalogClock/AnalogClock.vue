<template>
  <svg
    style="display: block; user-select: none"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    role="presentation"
  >
    <g
      :transform="`scale(${size / 100})`"
      @click="$emit('clock-click')"
      @contextmenu.prevent="$emit('clock-contextmenu')"
    >
      <clock-face />
      <g
        font-size="6"
        font-family="VT323"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#999999"
      >
        <text
          v-if="duration > 0"
          x="50"
          y="30"
          v-text="format.chronograph(duration)"
        />
      </g>
      <second-hand :time="time" />
      <chronograph-30-minute-totalizer-hand :duration="duration" />
      <chronograph-12-hour-totalizer-hand :duration="duration" />
      <short-hand :time="time" />
      <long-hand :time="time" />
      <chronograph-second-hand :duration="duration" />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import ClockFace from "./ClockFace.vue";
import ShortHand from "./ShortHand.vue";
import LongHand from "./LongHand.vue";
import SecondHand from "./SecondHand.vue";
import ChronographSecondHand from "./ChronographSecondHand.vue";
import Chronograph30MinuteTotalizerHand from "./Chronograph30MinuteTotalizerHand.vue";
import Chronograph12HourTotalizerHand from "./Chronograph12HourTotalizerHand.vue";
import * as format from "./format";
import { MINUTE } from "./utils";

export default defineComponent({
  props: {
    quartz: { type: Number, default: 0 },
    offset: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    size: { type: Number, default: 240 },
  },
  components: {
    ClockFace,
    ShortHand,
    LongHand,
    SecondHand,
    ChronographSecondHand,
    Chronograph30MinuteTotalizerHand,
    Chronograph12HourTotalizerHand,
  },
  setup: (props) => ({
    format,
    time: computed(() => props.quartz - props.offset * MINUTE),
  }),
});
</script>
