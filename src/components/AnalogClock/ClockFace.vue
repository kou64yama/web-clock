<template>
  <g font-family="DM Serif Display">
    <circle cx="50" cy="50" r="50" fill="#222222" />
    <circle cx="50" cy="50" r="45" fill="#111111" />
    <circle cx="50" cy="70" r="13" fill="#222222" />
    <circle cx="30" cy="50" r="13" fill="#222222" />
    <circle cx="70" cy="50" r="13" fill="#222222" />
    <template v-for="i in range(0, 299)">
      <path
        v-if="i % 75 === 0"
        :key="`main.scale.${i}`"
        :d="`M 50 6 L 50 9`"
        stroke="#ff0000"
        stroke-width="0.7"
        :transform="`rotate(${(i * 360) / 300}, 50, 50)`"
      />
      <path
        v-else-if="i % 25 === 0"
        :key="`main.scale.${i}`"
        :d="`M 50 6 L 50 9`"
        stroke="#cccccc"
        stroke-width="0.5"
        :transform="`rotate(${(i * 360) / 300}, 50, 50)`"
      />
      <path
        v-else-if="i % 5 === 0"
        :key="`main.scale.${i}`"
        :d="`M 50 6 L 50 9`"
        stroke="#cccccc"
        stroke-width="0.2"
        :transform="`rotate(${(i * 360) / 300}, 50, 50)`"
      />
      <path
        v-else
        :key="`main.scale.${i}`"
        :d="`M 50 7 L 50 8`"
        stroke="#cccccc"
        stroke-width="0.2"
        :transform="`rotate(${(i * 360) / 300}, 50, 50)`"
      />
    </template>
    <template v-for="i in range(0, 11)" :key="`main.scale-symbol.${i}`">
      <path
        :d="`M 50 10 L 50 15`"
        stroke="#cccccc"
        stroke-width="2"
        :transform="`rotate(${i * 30}, 50, 50)`"
      />
    </template>
    <template v-for="i in range(0, 59)">
      <path
        v-if="i % 5 === 0"
        :key="`small-second.scale.${i}`"
        :d="`M 30 37.5 L 30 40`"
        stroke="#cccccc"
        stroke-width="0.3"
        :transform="`rotate(${i * 6}, 30, 50)`"
      />
      <path
        v-else
        :key="`small-second.scale.${i}`"
        :d="`M 30 37.5 L 30 39`"
        stroke="#cccccc"
        stroke-width="0.2"
        :transform="`rotate(${i * 6}, 30, 50)`"
      />
    </template>
    <template v-for="i in range(0, 29)">
      <path
        v-if="i % 5 === 0"
        :key="`30-minute-totalizer.scale.${i}`"
        :d="`M 70 37.5 L 70 40`"
        stroke="#cccccc"
        stroke-width="0.3"
        :transform="`rotate(${i * 12}, 70, 50)`"
      />
      <path
        v-else
        :key="`30-minute-totalizer.scale.${i}`"
        :d="`M 70 37.5 L 70 39`"
        stroke="#cccccc"
        stroke-width="0.2"
        :transform="`rotate(${i * 12}, 70, 50)`"
      />
    </template>
    <template v-for="i in range(0, 11)" :key="`12-hour-totalizer.scale.${i}`">
      <path
        :d="`M 50 57.5 L 50 59`"
        stroke="#cccccc"
        stroke-width="0.2"
        :transform="`rotate(${i * 30}, 50, 70)`"
      />
    </template>
    <template v-for="i in [30, 60]" :key="`small-second.label.${i}`">
      <text
        :x="30 + 7 * sin((PI * i) / 30)"
        :y="50 - 7 * cos((PI * i) / 30)"
        font-size="4"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#cccccc"
        v-text="i"
      />
    </template>
    <template v-for="i in [10, 20, 30]" :key="`30-minute-totalizer.label.${i}`">
      <text
        :x="70 + 7 * sin((PI * i) / 15)"
        :y="50 - 7 * cos((PI * i) / 15)"
        font-size="4"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#cccccc"
        v-text="i"
      />
    </template>
    <template v-for="i in [3, 6, 9, 12]" :key="`12-hour-totalizer.label.${i}`">
      <text
        :x="50 + 9 * sin((PI * i) / 6)"
        :y="70 - 9 * cos((PI * i) / 6)"
        font-size="4"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#cccccc"
        v-text="i"
      />
    </template>
  </g>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const PI = Math.PI;
const range = (start: number, end: number) =>
  new Array(end - start + 1)
    .fill(0)
    .reduce<number[]>((acc) => [...acc, acc.length], []);
const sin = (x: number): number => Math.sin(x);
const cos = (x: number): number => Math.cos(x);

export default defineComponent({
  setup: () => ({ PI, range, sin, cos }),
});
</script>
