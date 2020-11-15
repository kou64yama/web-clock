<template>
  <g :transform="`rotate(${second(time)}, 50, 50)`">
    <path :d="`M 50 50 L 50 8`" stroke="#ff0000" stroke-width="0.5" />
    <circle cx="50" cy="50" r="2" fill="#ff0000" />
  </g>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { second } from "./clock";

export default defineComponent({
  props: {
    time: { type: Number, default: 0 }
  },
  setup: () => ({ second })
});
</script>
