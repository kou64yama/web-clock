import {
  ref,
  computed,
  onMounted,
  watch,
  ComputedRef,
} from "@vue/composition-api";

const STARTED = "chronograph.started";
const DURATION = "chronograph.duration";

interface Chronograph {
  duration: ComputedRef<number>;
  paused: ComputedRef<boolean>;
  startOrStop: () => void;
  reset: () => void;
}

const getter = <T>(name: string, defaultValue: T) => (): number | T => {
  const value = sessionStorage.getItem(name);
  if (value === null) return defaultValue;

  const num = parseInt(value);
  return Number.isNaN(num) ? defaultValue : num;
};

const setter = (name: string) => (value: number | null) => {
  if (value === null) {
    sessionStorage.removeItem(name);
  } else {
    sessionStorage.setItem(name, `${value}`);
  }
};

const getStarted = getter(STARTED, null);
const setStarted = setter(STARTED);
const getDuration = getter(DURATION, 0);
const setDuration = setter(DURATION);

export const useChronograph = (quartz: ComputedRef<number>): Chronograph => {
  const started = ref<number | null>(0);
  const stored = ref(0);
  const duration = computed(() => {
    if (started.value === null) return stored.value;
    return stored.value + quartz.value - started.value;
  });
  const paused = computed(() => started.value === null);

  const start = () => {
    started.value = quartz.value;
  };

  const stop = () => {
    if (started.value === null) return;
    stored.value += quartz.value - started.value;
    started.value = null;
  };

  const reset = () => {
    stored.value = 0;
  };

  const startOrStop = () => (paused.value ? start() : stop());

  onMounted(() => {
    started.value = getStarted();
    stored.value = getDuration();
  });

  watch(started, setStarted);
  watch(stored, setDuration);

  return { duration, paused, startOrStop, reset };
};
