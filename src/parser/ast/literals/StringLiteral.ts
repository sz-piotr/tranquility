import { SPAN_ZERO } from '../../location'

export class StringLiteral {
  public kind = 'StringLiteral' as const
  constructor (
    public value: string,
    public span = SPAN_ZERO
  ) {}
}
