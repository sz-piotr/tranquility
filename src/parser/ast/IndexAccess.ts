import { AstNodeBase } from './AstNodeBase'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export interface IndexAccess extends AstNodeBase {
  kind: 'IndexAccess',
  container: Expression,
  index: Expression
}

export function indexAccess (
  container: Expression,
  index: Expression,
  span = SPAN_ZERO
): IndexAccess {
  return {
    kind: 'IndexAccess',
    container,
    index,
    span
  }
}
