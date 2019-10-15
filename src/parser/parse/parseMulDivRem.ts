import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'
import { parseUnaryOperation } from './parseUnaryOperation'

export function parseMulDivRem (ctx: ParserContext) {
  const { start } = ctx.peek()
  let result: Ast.Expression = parseUnaryOperation(ctx)
  while (ctx.at(TokenKind.STAR) || ctx.at(TokenKind.SLASH) || ctx.at(TokenKind.PERCENT)) {
    const { kind } = ctx.next()
    const right = parseUnaryOperation(ctx)
    const { end } = right.span
    result = new Ast.BinaryOperation(
      getBinaryOperator(kind),
      result,
      right,
      { start, end }
    )
  }
  return result
}
