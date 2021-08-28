import { computed, ComputedRef, onBeforeUnmount, onMounted, ref } from 'vue';

interface Clock {
  quartz: ComputedRef<number>;
}

export const useClock = (): Clock => {
  let frame: number | null = null;
  const quartz = ref(0);

  const tick = () => {
    const value = Date.now();
    if (quartz.value !== value) {
      quartz.value = value;
    }

    frame = requestAnimationFrame(tick);
  };

  onMounted(tick);

  onBeforeUnmount(() => {
    if (frame !== null) cancelAnimationFrame(frame);
  });

  return { quartz: computed(() => quartz.value) };
};
