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
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    theta: { type: Number, required: true },
  },
});
</script>
