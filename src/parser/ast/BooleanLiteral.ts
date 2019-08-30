import { AstNodeBase } from './AstNodeBase'
import { SPAN_ZERO } from './Span'

export interface BooleanLiteral extends AstNodeBase {
  kind: 'BooleanLiteral',
  value: boolean
}

export function booleanLiteral (value: boolean, span = SPAN_ZERO): BooleanLiteral {
  return {
    kind: 'BooleanLiteral',
    value,
    span
  }
}
