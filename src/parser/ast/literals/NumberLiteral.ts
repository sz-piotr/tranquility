import { SPAN_ZERO } from '../../location'

export class NumberLiteral {
  kind = 'NumberLiteral' as const
  constructor (
    public value: string,
    public span = SPAN_ZERO
  ) {}
}
