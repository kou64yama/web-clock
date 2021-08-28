import {
  DeepReadonly,
  onBeforeUnmount,
  onMounted,
  readonly,
  Ref,
  ref,
} from 'vue';
import { nextFrame } from '../../helpers/frame';

interface Clock {
  quartz: DeepReadonly<Ref<number>>;
}

export const useClock = (): Clock => {
  const quartz = ref(0);
  const ab = new AbortController();
  const { signal } = ab;

  onMounted(async () => {
    while (!signal.aborted) {
      const value = Date.now();
      quartz.value = value;
      try {
        await nextFrame({ signal });
      } catch (aborted) {}
    }
  });

  onBeforeUnmount(() => ab.abort());

  return { quartz: readonly(quartz) };
};
