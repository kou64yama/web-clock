import { NumberNullableSerDe } from './NumberNullableSerDe';

test.each`
  value
  ${0}
  ${1}
  ${2}
  ${-1}
  ${-2}
  ${0.1}
  ${0.2}
  ${-0.1}
  ${-0.2}
  ${Number.MAX_VALUE}
  ${Number.MIN_VALUE}
  ${Number.MAX_SAFE_INTEGER}
  ${Number.MIN_SAFE_INTEGER}
  ${Number.POSITIVE_INFINITY}
  ${Number.NEGATIVE_INFINITY}
  ${Number.NaN}
  ${null}
`('serializable $value', ({ value }: { value: number | null }) => {
  const serde = new NumberNullableSerDe();
  const serialized = serde.serialize(value);
  const deserialized = serde.deserialize(serialized);
  expect(deserialized).toBe(value);
});
