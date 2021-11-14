import { WritableComputedRef } from 'vue';
import { StorageRef } from '.';
import {
  AdvancedStorageOptions,
  StorageOptions,
  storageRef,
} from './storageRef';

export type LocalStorageOptions = Omit<StorageOptions, 'storage'>;
export type AdvancedLocalStorageOptions<T> = Omit<
  AdvancedStorageOptions<T>,
  'storage'
>;

export interface LocalStorageRefFactory {
  (key: string, options?: LocalStorageOptions): WritableComputedRef<
    string | null
  >;
  <T>(
    key: string,
    options: AdvancedLocalStorageOptions<T>,
  ): WritableComputedRef<T>;
}

export const localStorageRef: LocalStorageRefFactory = (
  key: string,
  options?: LocalStorageOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): StorageRef<any> =>
  storageRef(key, {
    ...options,
    storage: window.localStorage,
  });
