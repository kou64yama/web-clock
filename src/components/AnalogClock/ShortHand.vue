<template>
  <g :transform="`rotate(${hour(time)}, 50, 50)`">
    <path :d="`M 50 50 L 50 30`" stroke="#000000" stroke-width="2.5" />
  </g>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { hour } from "./clock";

export default defineComponent({
  props: {
    time: { type: Number, default: 0 },
  },
  setup: () => ({ hour }),
});
</script>
