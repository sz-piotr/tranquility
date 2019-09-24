import { SPAN_ZERO } from '../../location'

export class Identifier {
  kind = 'Identifier' as const
  constructor (
    public value: string,
    public span = SPAN_ZERO
  ) {}
}
