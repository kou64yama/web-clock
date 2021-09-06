import { onBeforeUnmount, onMounted } from 'vue';

export const onStorage = (
  hook: (event: StorageEvent) => void,
): (() => void) => {
  const sub = () => window.addEventListener('storage', hook);
  const unsub = () => window.removeEventListener('storage', hook);

  onMounted(sub);
  onBeforeUnmount(unsub);

  return unsub;
};
