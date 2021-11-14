import { SerDe } from '../../../helpers/SerDe';

export class NumberNullableSerDe
  implements SerDe<number | null, string | null>
{
  public serialize(value: number | null): string | null {
    return value !== null ? `${value}` : null;
  }

  public deserialize(value: string | null): number | null {
    return value !== null ? Number(value) : null;
  }
}
