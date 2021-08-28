<template>
  <g :transform="`rotate(${theta}, 50, 50)`">
    <path
      :d="`M 50 50 L 50 30`"
      stroke="#999999"
      stroke-width="2.5"
      stroke-linecap="round"
    />
    <circle cx="50" cy="50" r="2.5" fill="#999999" />
  </g>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { gear, HOUR } from './utils';

const reducer = gear(12 * HOUR, 360);

export default defineComponent({
  props: {
    time: { type: Number, default: 0 },
  },
  setup: (props) => ({
    theta: computed(() => reducer(props.time)),
  }),
});
</script>
