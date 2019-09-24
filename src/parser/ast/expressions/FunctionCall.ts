import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class FunctionCall {
  kind = 'FunctionCall' as const
  constructor (
    public callee: Expression,
    public parameters: Expression[],
    public span = SPAN_ZERO
  ) {}
}
