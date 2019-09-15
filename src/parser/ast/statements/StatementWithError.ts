import { Statement } from '../common/Statement'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class StatementWithError {
  public kind = 'StatementWithError' as const
  constructor (
    public statement: Statement,
    public error: Expression,
    public span = SPAN_ZERO
  ) {}
}
