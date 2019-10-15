import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseEquality } from './parseEquality'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseLogicalAnd (ctx: ParserContext) {
  let left = parseEquality(ctx)

  while (ctx.atAnyOf(TokenKind.AND)) {
    const { kind } = ctx.next()
    const right = parseEquality(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
