import { onBeforeUnmount, Ref, watch } from 'vue';

export const onResize = (
  target: Ref<Element | undefined>,
  hook: (entry: ResizeObserverEntry) => void,
): (() => void) => {
  const observer = new ResizeObserver((entries) => hook(entries[0]));

  watch(target, (current, previous) => {
    if (previous) observer.unobserve(previous);
    if (current) observer.observe(current);
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return () => observer.disconnect();
};
