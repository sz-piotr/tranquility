import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class ExceptionExpression {
  kind = 'ExceptionExpression' as const
  constructor (
    public expression: Expression,
    public exception: Expression,
    public span = SPAN_ZERO
  ) {}
}
