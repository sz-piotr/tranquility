import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export enum AssignmentOperator {
  EQUALS,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
}

export class VariableAssignment {
  kind = 'VariableAssignment' as const
  constructor (
    public operator: AssignmentOperator,
    public left: Expression,
    public right: Expression,
    public span = SPAN_ZERO
  ) {}
}
