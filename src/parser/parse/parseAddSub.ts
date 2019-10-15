import { ParserContext } from './ParserContext'
import { BinaryOperation } from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'
import { parseMulDivRem } from './parseMulDivRem'

export function parseAddSub (ctx: ParserContext) {
  let result = parseMulDivRem(ctx)
  const { start } = result.span

  while (ctx.atAnyOf(TokenKind.PLUS, TokenKind.MINUS)) {
    const { kind } = ctx.next()
    const right = parseMulDivRem(ctx)
    const { end } = right.span
    result = new BinaryOperation(
      getBinaryOperator(kind),
      result,
      right,
      { start, end }
    )
  }

  return result
}
