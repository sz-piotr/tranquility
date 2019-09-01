import { AstNodeBase } from '../common/AstNodeBase'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../common/Span'

export interface ReturnStatement extends AstNodeBase {
  kind: 'ReturnStatement',
  value: Expression
}

export function returnStatement (
  value: Expression,
  span = SPAN_ZERO
): ReturnStatement {
  return {
    kind: 'ReturnStatement',
    value,
    span
  }
}
