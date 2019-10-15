import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseUnaryOperation } from './parseUnaryOperation'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseMulDivRem (ctx: ParserContext) {
  let left = parseUnaryOperation(ctx)

  while (ctx.atAnyOf(TokenKind.STAR, TokenKind.SLASH, TokenKind.PERCENT)) {
    const { kind } = ctx.next()
    const right = parseUnaryOperation(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
