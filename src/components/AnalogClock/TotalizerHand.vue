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
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    theta: { type: Number, required: true },
  },
});
</script>
