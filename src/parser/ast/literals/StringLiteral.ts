import { AstNodeBase } from '../common/AstNodeBase'
import { SPAN_ZERO } from '../../location'

export interface StringLiteral extends AstNodeBase {
  kind: 'StringLiteral',
  value: string
}

export function stringLiteral (
  value: string,
  span = SPAN_ZERO
): StringLiteral {
  return {
    kind: 'StringLiteral',
    value,
    span
  }
}
