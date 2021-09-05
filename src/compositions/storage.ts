import { computed, onMounted, ref, WritableComputedRef } from 'vue';
import { onStorage } from '../hooks/storage';

export type SetValue = (value: string | null) => void;

interface StorageOptions {
  storage?: Storage;
}

export const useStorage = (
  key: string,
  { storage }: Required<StorageOptions>,
): WritableComputedRef<string | null> => {
  const refValue = ref<string | null>(null);

  const accessor = computed({
    get: () => refValue.value,
    set: (value) => {
      if (value !== null) storage.setItem(key, value);
      else storage.removeItem(key);
      refValue.value = value;
    },
  });

  onMounted(() => {
    refValue.value = storage.getItem(key);
  });

  onStorage((event) => {
    if (event.storageArea === storage && event.key === key) {
      refValue.value = event.newValue;
    }
  });

  return accessor;
};

export const useLocalStorage = (
  key: string,
): WritableComputedRef<string | null> =>
  useStorage(key, { storage: window.localStorage });
