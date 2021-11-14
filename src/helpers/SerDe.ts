export interface SerDe<T, V> {
  serialize(value: T): V;
  deserialize(value: V): T;
}
