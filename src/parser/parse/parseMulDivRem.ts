import { ParserContext } from './ParserContext'
import { BinaryOperation } from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'
import { parseUnaryOperation } from './parseUnaryOperation'

export function parseMulDivRem (ctx: ParserContext) {
  let result = parseUnaryOperation(ctx)
  const { start } = result.span

  while (ctx.atAnyOf(TokenKind.STAR, TokenKind.SLASH, TokenKind.PERCENT)) {
    const { kind } = ctx.next()
    const right = parseUnaryOperation(ctx)
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
