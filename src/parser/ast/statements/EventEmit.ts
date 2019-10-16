import { Identifier } from '../literals/Identifier'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class EventEmit {
  kind = 'EventEmit' as const
  constructor (
    public event: Identifier,
    public parameters: Expression[],
    public span = SPAN_ZERO
  ) {}
}
