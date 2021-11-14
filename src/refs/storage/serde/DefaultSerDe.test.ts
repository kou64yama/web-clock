import { DefaultSerDe } from './DefaultSerDe';

test.each`
  value
  ${'foo'}
  ${'bar'}
  ${''}
  ${null}
`('serializable $value', ({ value }: { value: string | null }) => {
  const serde = new DefaultSerDe();
  const serialized = serde.serialize(value);
  const deserialized = serde.deserialize(serialized);
  expect(deserialized).toBe(value);
});
