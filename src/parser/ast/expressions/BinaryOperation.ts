import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class BinaryOperation {
  public kind = 'BinaryOperation' as const
  constructor (
    public operator: BinaryOperator,
    public left: Expression,
    public right: Expression,
    public span = SPAN_ZERO
  ) {}
}

export enum BinaryOperator {
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
