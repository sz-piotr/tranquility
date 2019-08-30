import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export enum Operation {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUAL,
  NOT_EQUAL,
  GREATER,
  GREATER_OR_EQUAL,
  LESS,
  LESS_OR_EQUAL
}

export interface BinaryOperation extends AstNodeBase {
  kind: 'BinaryOperation',
  operator: Operation,
  left: Expression,
  right: Expression
}

export function binaryOperation (
  operator: Operation,
  left: Expression,
  right: Expression,
  span = SPAN_ZERO
): BinaryOperation {
  return {
    kind: 'BinaryOperation',
    operator,
    left,
    right,
    span
  }
}
