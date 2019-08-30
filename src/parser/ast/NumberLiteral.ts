import { AstNodeBase } from './AstNodeBase'
import { SPAN_ZERO } from './Span'

export interface NumberLiteral extends AstNodeBase {
  kind: 'NumberLiteral',
  value: string
}

export function numberLiteral (
  value: string,
  span = SPAN_ZERO
): NumberLiteral {
  return {
    kind: 'NumberLiteral',
    value,
    span
  }
}
