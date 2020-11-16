<template>
  <g>
    <circle
      cx="50"
      cy="50"
      r="47"
      fill="transparent"
      stroke="#000000"
      stroke-width="0.3"
    />
    <template v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]">
      <text
        :key="i"
        :x="50 + 37 * sin((PI * i) / 6)"
        :y="50 - 37 * cos((PI * i) / 6)"
        font-size="10"
        font-family="DM Serif Display"
        text-anchor="middle"
        dominant-baseline="central"
        v-text="i"
      />
    </template>
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
const PI = Math.PI;
const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

export default defineComponent({
  setup: () => ({ scales, PI, sin, cos }),
});
</script>
