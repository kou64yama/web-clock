<template>
  <g :transform="`rotate(${theta}, 70, 50)`">
    <path
      :d="`M 70 50 L 70 39`"
      stroke="#cccccc"
      stroke-width="0.7"
      stroke-linecap="round"
    />
    <circle cx="70" cy="50" r="1" fill="#cccccc" />
  </g>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { gear, MINUTE } from './utils';

const reducer = gear(30 * MINUTE, 360);

export default defineComponent({
  props: {
    duration: { type: Number, default: 0 },
  },
  setup: (props) => ({
    theta: computed(() => reducer(props.duration)),
  }),
});
</script>
