import { SerDe } from '../../../helpers/SerDe';

export class DefaultSerDe implements SerDe<string | null, string | null> {
  public serialize(value: string | null): string | null {
    return value;
  }

  public deserialize(value: string | null): string | null {
    return value;
  }
}
