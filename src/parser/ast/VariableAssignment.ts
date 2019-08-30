import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export interface VariableAssignment extends AstNodeBase {
  kind: 'VariableAssignment',
  left: Expression,
  right: Expression
}

export function variableAssignment (
  left: Expression,
  right: Expression,
  span = SPAN_ZERO
): VariableAssignment {
  return {
    kind: 'VariableAssignment',
    left,
    right,
    span
  }
}
