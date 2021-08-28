import { computed, ComputedRef } from 'vue';
import { useLocalStorage } from '../../compositions/local-storage';

const STARTED = 'chronograph.started';
const DURATION = 'chronograph.duration';

interface Chronograph {
  duration: ComputedRef<number>;
  paused: ComputedRef<boolean>;
  startOrStop: () => void;
  reset: () => void;
}

export const useChronograph = (quartz: ComputedRef<number>): Chronograph => {
  const [rawStarted, setRawStarted] = useLocalStorage(STARTED);
  const [rawStored, setRawStored] = useLocalStorage(DURATION);

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

  const start = () => {
    setRawStarted(`${quartz.value}`);
  };

  const stop = () => {
    if (started.value === null) return;
    setRawStored(`${stored.value + quartz.value - started.value}`);
    setRawStarted(null);
  };

  const reset = () => setRawStored(null);

  const startOrStop = () => (paused.value ? start() : stop());

  return { duration, paused, startOrStop, reset };
};
