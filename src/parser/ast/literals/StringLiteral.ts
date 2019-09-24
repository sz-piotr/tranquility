import { SPAN_ZERO } from '../../location'

export class StringLiteral {
  kind = 'StringLiteral' as const
  constructor (
    public value: string,
    public span = SPAN_ZERO
  ) {}
}
