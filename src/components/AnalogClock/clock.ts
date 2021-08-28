import {
  DeepReadonly,
  onBeforeUnmount,
  onMounted,
  readonly,
  Ref,
  ref,
} from 'vue';

interface Clock {
  quartz: DeepReadonly<Ref<number>>;
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

  return { quartz: readonly(quartz) };
};
