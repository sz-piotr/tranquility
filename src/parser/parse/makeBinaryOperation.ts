import { Expression, BinaryOperation } from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'

export function makeBinaryOperation (kind: TokenKind, left: Expression, right: Expression) {
  return new BinaryOperation(
    getBinaryOperator(kind),
    left,
    right,
    {
      start: left.span.start,
      end: right.span.end
    }
  )
}
