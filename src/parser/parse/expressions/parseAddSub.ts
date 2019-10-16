import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import { parseMulDivRem } from './parseMulDivRem'
import { makeBinaryOperation } from './makeBinaryOperation'

export function parseAddSub (ctx: ParserContext) {
  let left = parseMulDivRem(ctx)

  while (ctx.atAnyOf(TokenKind.PLUS, TokenKind.MINUS)) {
    const { kind } = ctx.next()
    const right = parseMulDivRem(ctx)
    left = makeBinaryOperation(kind, left, right)
  }

  return left
}
