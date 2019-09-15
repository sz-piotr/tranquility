import { Identifier } from '../expressions/Identifier'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class EventEmit {
  public kind = 'EventEmit' as const
  constructor (
    public event: Identifier,
    public parameters: Expression[],
    public span = SPAN_ZERO
  ) {}
}
