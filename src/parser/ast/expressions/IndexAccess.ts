import { AstNodeBase } from '../common/AstNodeBase'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../common/Span'

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
