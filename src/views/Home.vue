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
import { defineComponent, ref } from 'vue';
import { useChronograph, useQuartz } from '../clock';
import AnalogClock from '../components/AnalogClock';
import { onResize } from '../hooks/resize';

const offset = new Date(0).getTimezoneOffset();

export default defineComponent({
  components: {
    AnalogClock,
  },
  setup: () => {
    const root = ref<HTMLDivElement>();
    const { quartz } = useQuartz();
    const { duration, ...chronograph } = useChronograph(quartz);
    const size = ref(0);

    onResize(root, ({ contentRect }) => {
      size.value = Math.min(contentRect.width, contentRect.height);
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
