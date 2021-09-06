<template>
  <g :transform="`rotate(${theta}, 50, 50)`">
    <path
      :d="`M 50 50 L 50 12`"
      stroke="#cccccc"
      stroke-width="1.25"
      stroke-linecap="round"
    />
    <circle cx="50" cy="50" r="2" fill="#cccccc" />
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
