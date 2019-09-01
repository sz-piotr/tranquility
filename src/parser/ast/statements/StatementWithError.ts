import { AstNodeBase } from '../common/AstNodeBase'
import { Statement } from '../common/Statement'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export interface StatementWithError extends AstNodeBase {
  kind: 'StatementWithError',
  statement: Statement,
  error: Expression
}

export function statementWithError (
  statement: Statement,
  error: Expression,
  span = SPAN_ZERO
): StatementWithError {
  return {
    kind: 'StatementWithError',
    statement,
    error,
    span
  }
}
