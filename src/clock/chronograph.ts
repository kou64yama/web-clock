import { computed, DeepReadonly, Ref } from 'vue';
import { localStorageRef } from '../refs/storage';
import { NumberNullableSerDe, NumberSerDe } from '../refs/storage/serde';

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
  const started = localStorageRef<number | null>(STARTED, {
    serde: new NumberNullableSerDe(),
  });
  const stored = localStorageRef<number>(DURATION, {
    serde: new NumberSerDe(),
  });
  const duration = computed(() => {
    if (started.value === null) return stored.value;
    return stored.value + quartz.value - started.value;
  });
  const paused = computed(() => started.value === null);

  const reset = () => {
    started.value = null;
    stored.value = 0;
  };

  const startOrStop = () => {
    if (started.value === null) {
      started.value = quartz.value;
    } else {
      stored.value = stored.value + quartz.value - started.value;
      started.value = null;
    }
  };

  return { duration, paused, startOrStop, reset };
};
