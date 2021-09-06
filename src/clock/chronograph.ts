import { computed, DeepReadonly, Ref } from 'vue';
import { useLocalStorage } from '../compositions/storage';

export const STARTED = 'chronograph.started';
export const DURATION = 'chronograph.duration';

interface Chronograph {
  duration: DeepReadonly<Ref<number>>;
  paused: DeepReadonly<Ref<boolean>>;
  startOrStop: () => void;
  reset: () => void;
}

export const useChronograph = (
  quartz: DeepReadonly<Ref<number>>,
): Chronograph => {
  const rawStarted = useLocalStorage(STARTED);
  const rawStored = useLocalStorage(DURATION);

  const started = computed(() => {
    if (rawStarted.value === null) return null;
    const value = parseInt(rawStarted.value, 10);
    return Number.isFinite(value) ? value : null;
  });
  const stored = computed(() => {
    if (rawStored.value === null) return 0;
    const value = parseInt(rawStored.value, 10);
    return Number.isFinite(value) ? value : 0;
  });
  const duration = computed(() => {
    if (started.value === null) return stored.value;
    return stored.value + quartz.value - started.value;
  });
  const paused = computed(() => started.value === null);

  const reset = () => {
    rawStarted.value = null;
    rawStored.value = null;
  };

  const startOrStop = () => {
    if (started.value === null) {
      rawStarted.value = `${quartz.value}`;
    } else {
      rawStored.value = `${stored.value + quartz.value - started.value}`;
      rawStarted.value = null;
    }
  };

  return { duration, paused, startOrStop, reset };
};
