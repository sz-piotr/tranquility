import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { getBinaryOperator } from './getOperator'
import { parseTerm } from './parseTerm'

export function parseExpression (ctx: ParserContext): Ast.Expression {
  const { start } = ctx.peek()
  let result: Ast.Expression = parseTerm(ctx)
  while (ctx.at(TokenKind.PLUS) || ctx.at(TokenKind.MINUS)) {
    const { kind } = ctx.next()
    const right = parseTerm(ctx)
    result = new Ast.BinaryOperation(
      getBinaryOperator(kind),
      result,
      right,
      { start, end: ctx.peek().end }
    )
  }
  return result
}
