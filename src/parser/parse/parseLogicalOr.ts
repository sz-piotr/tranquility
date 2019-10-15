import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseLogicalAnd } from './parseLogicalAnd'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseLogicalOr (ctx: ParserContext) {
  let left = parseLogicalAnd(ctx)

  while (ctx.atAnyOf(TokenKind.OR)) {
    const { kind } = ctx.next()
    const right = parseLogicalAnd(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
