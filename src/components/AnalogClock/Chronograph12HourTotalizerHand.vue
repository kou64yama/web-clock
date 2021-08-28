<template>
  <g :transform="`rotate(${theta}, 50, 70)`">
    <path
      :d="`M 50 70 L 50 59`"
      stroke="#cccccc"
      stroke-width="0.7"
      stroke-linecap="round"
    />
    <circle cx="50" cy="70" r="1" fill="#cccccc" />
  </g>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { gear, HOUR } from './utils';

const reducer = gear(12 * HOUR, 360);

export default defineComponent({
  props: {
    duration: { type: Number, default: 0 },
  },
  setup: (props) => ({
    theta: computed(() => reducer(props.duration)),
  }),
});
</script>
