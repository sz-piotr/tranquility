import { SPAN_ZERO } from '../../location'

export class ZeroLiteral {
  kind = 'ZeroLiteral' as const
  constructor (
    public span = SPAN_ZERO
  ) {}
}
