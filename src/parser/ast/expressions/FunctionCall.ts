import { AstNodeBase } from '../common/AstNodeBase'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../common/Span'

export interface FunctionCall extends AstNodeBase {
  kind: 'FunctionCall',
  callee: Expression,
  parameters: Expression[]
}

export function functionCall (
  callee: Expression,
  parameters: Expression[],
  span = SPAN_ZERO
): FunctionCall {
  return {
    kind: 'FunctionCall',
    callee,
    parameters,
    span
  }
}
