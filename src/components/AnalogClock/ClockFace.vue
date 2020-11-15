<template>
  <g>
    <template v-for="i in scales">
      <path
        v-if="i % 30 === 0"
        :key="i"
        :d="`M 50 5 L 50 7`"
        stroke="#000000"
        stroke-width="2"
        :transform="`rotate(${i}, 50, 50)`"
      />
      <path
        v-else
        :key="i"
        :d="`M 50 5 L 50 6`"
        stroke="#000000"
        stroke-width="1"
        :transform="`rotate(${i}, 50, 50)`"
      />
    </template>
  </g>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const scales = new Array(60)
  .fill(0)
  .reduce((acc) => [...acc, acc.length * 6], []);

export default defineComponent({
  setup: () => ({ scales }),
});
</script>
