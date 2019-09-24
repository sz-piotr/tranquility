import { SPAN_ZERO } from '../../location'

export class BooleanLiteral {
  kind = 'BooleanLiteral' as const
  constructor (
    public value: boolean,
    public span = SPAN_ZERO
  ) {}
}
