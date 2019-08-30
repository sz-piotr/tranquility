import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

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
