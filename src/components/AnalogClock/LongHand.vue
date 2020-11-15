<template>
  <g :transform="`rotate(${minute(time)}, 50, 50)`">
    <path :d="`M 50 50 L 50 10`" stroke="#000000" stroke-width="1.25" />
  </g>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { minute } from "./clock";

export default defineComponent({
  props: {
    time: { type: Number, default: 0 },
  },
  setup: () => ({ minute }),
});
</script>
