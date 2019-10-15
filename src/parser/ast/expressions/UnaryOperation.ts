import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class UnaryOperation {
  kind = 'UnaryOperation' as const
  constructor (
    public operator: UnaryOperator,
    public operand: Expression,
    public span = SPAN_ZERO
  ) {}
}

export enum UnaryOperator {
  PLUS,
  MINUS,
  NOT,
}
