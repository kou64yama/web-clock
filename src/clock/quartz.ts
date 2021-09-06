import {
  DeepReadonly,
  onBeforeUnmount,
  onMounted,
  reactive,
  readonly,
  Ref,
  ref,
} from 'vue';
import { nextFrame } from '../helpers/frame';
import { createMonitor, Performance } from './monitor';

export interface Quartz {
  quartz: DeepReadonly<Ref<number>>;
  performance: DeepReadonly<Performance>;
}

export const useQuartz = (): Quartz => {
  const quartz = ref(0);
  const performance = reactive<Performance>({
    fps: 0,
    frames: 0,
    delta: 0,
    time: 0,
  });
  const ab = new AbortController();
  const { signal } = ab;
  const monitor = createMonitor();

  monitor.addEventListener('data', ({ fps, frames, delta, time }) => {
    performance.fps = fps;
    performance.frames = frames;
    performance.delta = delta;
    performance.time = time;
  });

  onMounted(async () => {
    while (!signal.aborted) {
      const value = Date.now();
      quartz.value = value;
      try {
        const time = await nextFrame({ signal });
        monitor.push(time);
      } catch (aborted) {}
    }
  });

  onBeforeUnmount(() => {
    ab.abort();
    monitor.removeAllListeners();
  });

  return {
    quartz: readonly(quartz),
    performance: readonly(performance),
  };
};
