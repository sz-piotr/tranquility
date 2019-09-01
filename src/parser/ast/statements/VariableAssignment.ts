import { AstNodeBase } from '../common/AstNodeBase'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

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
