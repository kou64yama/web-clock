import { ref, onMounted, onBeforeUnmount } from "@vue/composition-api";

const HOUR = 12 * 60 * 60 * 1000;
const MINUTE = 60 * 60 * 1000;
const SECOND = 60 * 1000;

interface ClockOptions {
  offset?: number;
  smooth?: boolean;
}

export const useClock = ({ offset = 0, smooth = false }: ClockOptions = {}) => {
  const time = ref(0);

  let frame: number | null = null;

  const tick = () => {
    let value = Date.now() - offset * 60 * 1000;
    if (!smooth) {
      value = Math.floor(value / 1000) * 1000;
    }

    if (time.value !== value) {
      time.value = value;
    }

    frame = requestAnimationFrame(tick);
  };

  onMounted(tick);

  onBeforeUnmount(() => {
    if (frame !== null) cancelAnimationFrame(frame);
  });

  return { time };
};

export const hour = (time: number) => (360 * (time % HOUR)) / HOUR;
export const minute = (time: number) => (360 * (time % MINUTE)) / MINUTE;
export const second = (time: number) => (360 * (time % SECOND)) / SECOND;
