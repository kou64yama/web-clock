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
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    theta: { type: Number, required: true },
  },
});
</script>
