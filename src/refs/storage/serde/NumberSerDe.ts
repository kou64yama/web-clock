import { SerDe } from '../../../helpers/SerDe';

export class NumberSerDe implements SerDe<number, string | null> {
  public serialize(value: number): string | null {
    return value !== 0 ? `${value}` : null;
  }

  public deserialize(value: string | null): number {
    return value !== null ? Number(value) : 0;
  }
}
