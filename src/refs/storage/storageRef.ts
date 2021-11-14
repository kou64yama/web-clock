import { computed, onMounted, ref, WritableComputedRef } from 'vue';
import { SerDe } from '../../helpers/SerDe';
import { onStorage } from '../../hooks/storage';
import { DefaultSerDe } from './serde';

export interface StorageOptions {
  storage: Storage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serde?: SerDe<any, string | null>;
}

export interface AdvancedStorageOptions<T> extends StorageOptions {
  serde: SerDe<T, string | null>;
}

export type StorageRef<T> = WritableComputedRef<T>;

export interface StorageRefFactory {
  (key: string, options: StorageOptions): WritableComputedRef<string | null>;
  <T>(key: string, options: AdvancedStorageOptions<T>): WritableComputedRef<T>;
}

export const storageRef: StorageRefFactory = (
  key: string,
  options: StorageOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): StorageRef<any> => {
  const { storage, serde = new DefaultSerDe() } = options;
  const refValue = ref<string | null>(null);

  const accessor = computed({
    get: () => serde.deserialize(refValue.value),
    set: (value) => {
      const serialized = serde.serialize(value);
      if (serialized !== null) storage.setItem(key, serialized);
      else storage.removeItem(key);
      refValue.value = serialized;
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
