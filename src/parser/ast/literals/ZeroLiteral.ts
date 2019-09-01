import { AstNodeBase } from '../common/AstNodeBase'
import { SPAN_ZERO } from '../../location'

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
