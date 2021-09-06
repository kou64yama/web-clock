<template>
  <div class="container">
    <svg
      style="display: block; user-select: none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      role="presentation"
    >
      <g
        @click="$emit('chronograph:start-or-stop', duration)"
        @contextmenu.prevent="$emit('chronograph:reset', duration)"
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
            v-text="chronograph(duration)"
          />
        </g>
        <second-hand :theta="clock.second" />
        <totalizer-30-minute-hand :theta="totalizer.thirty" />
        <totalizer-12-hour-hand :theta="totalizer.twelve" />
        <short-hand :theta="clock.short" />
        <long-hand :theta="clock.long" />
        <totalizer-hand :theta="totalizer.minute" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ClockFace from './ClockFace.vue';
import { chronograph } from './format';
import LongHand from './LongHand.vue';
import SecondHand from './SecondHand.vue';
import ShortHand from './ShortHand.vue';
import Totalizer12HourHand from './Totalizer12HourHand.vue';
import Totalizer30MinuteHand from './Totalizer30MinuteHand.vue';
import TotalizerHand from './TotalizerHand.vue';
import { gear, HOUR, MINUTE } from './utils';

export default defineComponent({
  components: {
    ClockFace,
    LongHand,
    SecondHand,
    ShortHand,
    Totalizer12HourHand,
    Totalizer30MinuteHand,
    TotalizerHand,
  },
  props: {
    duration: { type: Number, default: 0 },
    offset: { type: Number, default: 0 },
    quartz: { type: Number, default: 0 },
  },
  emits: {
    'chronograph:start-or-stop': (duration: number) =>
      Number.isFinite(duration),
    'chronograph:reset': (duration: number) => Number.isFinite(duration),
  },
  setup: (props) => {
    const gears = {
      ratio12Hours: gear(12 * HOUR, 360),
      ratioHour: gear(HOUR, 360),
      ratioMinute: gear(MINUTE, 360),
      ratio30Minutes: gear(30 * MINUTE, 360),
    };
    const clock = computed(() => {
      const time = props.quartz - props.offset * MINUTE;
      return {
        short: gears.ratio12Hours(time),
        long: gears.ratioHour(time),
        second: gears.ratioMinute(time),
      };
    });
    const totalizer = computed(() => ({
      minute: gears.ratioMinute(props.duration),
      thirty: gears.ratio30Minutes(props.duration),
      twelve: gears.ratio12Hours(props.duration),
    }));
    return {
      clock,
      totalizer,
      chronograph,
    };
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  height: 100%;
}
</style>
