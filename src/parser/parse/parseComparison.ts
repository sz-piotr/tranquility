import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseAddSub } from './parseAddSub'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseComparison (ctx: ParserContext) {
  let left = parseAddSub(ctx)

  while (ctx.atAnyOf(TokenKind.LEFT, TokenKind.LEFT_EQUALS, TokenKind.RIGHT, TokenKind.RIGHT_EQUALS)) {
    const { kind } = ctx.next()
    const right = parseAddSub(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
