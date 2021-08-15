<template>
  <g :transform="`rotate(${theta}, 50, 50)`">
    <path
      :d="`M 50 50 L 50 7`"
      stroke="#ff0000"
      stroke-width="0.5"
      stroke-linecap="round"
    />
    <circle cx="50" cy="50" r="1" fill="#ff0000" />
  </g>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { gear, MINUTE } from './utils';

const reducer = gear(MINUTE, 360);

export default defineComponent({
  props: {
    duration: { type: Number, default: 0 },
  },
  setup: (props) => ({
    theta: computed(() => reducer(props.duration)),
  }),
});
</script>
