<template>
  <div ref="root" class="home">
    <analog-clock
      :quartz="quartz"
      :offset="offset"
      :duration="duration"
      :size="size"
      @clock-click="chronograph.startOrStop"
      @clock-contextmenu="chronograph.reset"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import AnalogClock, {
  useClock,
  useChronograph,
} from '../components/AnalogClock';

const offset = new Date(0).getTimezoneOffset();

export default defineComponent({
  components: {
    AnalogClock,
  },
  setup: () => {
    const root = ref<HTMLDivElement>();
    const { quartz } = useClock();
    const { duration, ...chronograph } = useChronograph(quartz);
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

    return { root, quartz, offset, duration, size, chronograph };
  },
});
</script>

<style scoped>
.home {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
