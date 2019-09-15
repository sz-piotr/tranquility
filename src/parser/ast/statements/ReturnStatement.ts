import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class ReturnStatement {
  public kind = 'ReturnStatement' as const
  constructor (
    public value: Expression,
    public span = SPAN_ZERO
  ) {}
}
