import { SPAN_ZERO } from '../../location'

export class BooleanLiteral {
  public kind = 'BooleanLiteral' as const
  constructor (
    public value: boolean,
    public span = SPAN_ZERO
  ) {}
}
