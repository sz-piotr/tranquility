import { AstNodeBase } from './AstNodeBase'
import { SPAN_ZERO } from './Span'

export interface ZeroLiteral extends AstNodeBase {
  kind: 'ZeroLiteral'
}

export function zeroLiteral (
  span = SPAN_ZERO
): ZeroLiteral {
  return {
    kind: 'ZeroLiteral',
    span
  }
}
