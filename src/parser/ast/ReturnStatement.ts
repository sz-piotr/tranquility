import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

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
