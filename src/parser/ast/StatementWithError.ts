import { AstNodeBase } from './AstNodeBase'
import { Statement } from './Statement'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export interface StatementWithError extends AstNodeBase {
  kind: 'StatementWithError',
  statement: Statement,
  error: Expression,
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
