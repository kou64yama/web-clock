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
  storage?: Storage;
}

export const useLocalStorage = (
  key: string,
  { storage = window.localStorage }: LocalStorageOptions = {},
): [DeepReadonly<Ref<string | null>>, SetValue] => {
  const refValue = ref<string | null>(null);

  const setValue = (value: string | null) => {
    if (value !== null) storage.setItem(key, value);
    else storage.removeItem(key);
    refValue.value = value;
  };

  const listener = (event: StorageEvent) => {
    if (event.storageArea === storage && event.key === key) {
      refValue.value = event.newValue;
    }
  };

  onMounted(() => {
    window.addEventListener('storage', listener);
    refValue.value = storage.getItem(key);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('storage', listener);
  });

  return [readonly(refValue), setValue];
};
