import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { getOperation } from './getOperation'
import { parseTerm } from './parseTerm'

export function parseExpression (ctx: ParserContext): Ast.Expression {
  const { start } = ctx.peek()
  let result: Ast.Expression = parseTerm(ctx)
  while (ctx.at(TokenKind.PLUS) || ctx.at(TokenKind.MINUS)) {
    const { kind } = ctx.next()
    const right = parseTerm(ctx)
    result = Ast.binaryOperation(
      getOperation(kind),
      result,
      right,
      { start, end: ctx.peek().end }
    )
  }
  return result
}
