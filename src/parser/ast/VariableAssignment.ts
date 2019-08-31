import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export enum AssignmentOperator {
  EQUALS,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
}

export interface VariableAssignment extends AstNodeBase {
  kind: 'VariableAssignment',
  operator: AssignmentOperator,
  left: Expression,
  right: Expression
}

export function variableAssignment (
  operator: AssignmentOperator,
  left: Expression,
  right: Expression,
  span = SPAN_ZERO
): VariableAssignment {
  return {
    kind: 'VariableAssignment',
    operator,
    left,
    right,
    span
  }
}
