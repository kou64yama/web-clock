<template>
  <div :class="$style.root" ref="root">
    <analog-clock :time="time" :size="size" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeMount,
} from "@vue/composition-api";
import AnalogClock, { useClock } from "@/components/AnalogClock";

const offset = new Date(0).getTimezoneOffset();

export default defineComponent({
  components: {
    AnalogClock,
  },
  setup: () => {
    const root = ref<HTMLDivElement>();
    const { time } = useClock({ offset });
    const size = ref(0);

    let frame: number | null = null;

    const resize = () => {
      frame = requestAnimationFrame(resize);
      if (root.value) {
        size.value = Math.min(root.value.clientWidth, root.value.clientHeight);
      }
    };

    onMounted(resize);

    onBeforeMount(() => {
      if (frame) cancelAnimationFrame(frame);
    });

    return { root, time, size };
  },
});
</script>

<style module>
.root {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
