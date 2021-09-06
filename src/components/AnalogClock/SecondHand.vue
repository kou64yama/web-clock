<template>
  <g :transform="`rotate(${theta}, 30, 50)`">
    <path
      :d="`M 30 50 L 30 39`"
      stroke="#cccccc"
      stroke-width="0.7"
      stroke-linecap="round"
    />
    <circle cx="30" cy="50" r="1" fill="#cccccc" />
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
