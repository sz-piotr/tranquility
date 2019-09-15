import { SPAN_ZERO } from '../../location'

export class NumberLiteral {
  public kind = 'NumberLiteral' as const
  constructor (
    public value: string,
    public span = SPAN_ZERO
  ) {}
}
