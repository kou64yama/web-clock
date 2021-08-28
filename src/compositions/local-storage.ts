import {
  DeepReadonly,
  onBeforeUnmount,
  onMounted,
  readonly,
  Ref,
  ref,
} from 'vue';

export type SetValue = (value: string | null) => void;

interface LocalStorageOptions {
  window?: Window;
  localStorage?: Storage;
}

export const useLocalStorage = (
  key: string,
  { window = self, localStorage = self.localStorage }: LocalStorageOptions = {},
): [DeepReadonly<Ref<string | null>>, SetValue] => {
  const refValue = ref<string | null>(null);

  const setValue = (value: string | null) => {
    if (value !== null) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
    refValue.value = value;
  };

  const listener = (event: StorageEvent) => {
    if (event.key === key) refValue.value = event.newValue;
  };

  onMounted(() => {
    window.addEventListener('storage', listener);
    refValue.value = localStorage.getItem(key);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('storage', listener);
  });

  return [readonly(refValue), setValue];
};
