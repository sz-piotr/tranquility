import { AstNodeBase } from '../common/AstNodeBase'
import { SPAN_ZERO } from '../common/Span'

export interface Identifier extends AstNodeBase {
  kind: 'Identifier',
  value: string
}

export function identifier (
  value: string,
  span = SPAN_ZERO
): Identifier {
  return {
    kind: 'Identifier',
    value,
    span
  }
}
