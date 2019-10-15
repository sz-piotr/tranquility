import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseComparison } from './parseComparison'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseEquality (ctx: ParserContext) {
  let left = parseComparison(ctx)

  while (ctx.atAnyOf(TokenKind.EQUALS_EQUALS, TokenKind.BANG_EQUALS)) {
    const { kind } = ctx.next()
    const right = parseComparison(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
