import { ParserContext } from './ParserContext'
import { BinaryOperation } from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'
import { parseAddSub } from './parseAddSub'

export function parseComparison (ctx: ParserContext) {
  let result = parseAddSub(ctx)
  const { start } = result.span

  while (ctx.atAnyOf(TokenKind.LEFT, TokenKind.LEFT_EQUALS, TokenKind.RIGHT, TokenKind.RIGHT_EQUALS)) {
    const { kind } = ctx.next()
    const right = parseAddSub(ctx)
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
