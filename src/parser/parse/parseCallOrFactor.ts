import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { parseExpression } from './parseExpression'
import { parseLiteralOrParenthesized } from './parseLiteralOrParenthesized'

export function parseCallOrFactor (ctx: ParserContext): Ast.Expression {
  const { start } = ctx.peek()
  let result = parseLiteralOrParenthesized(ctx)
  while (ctx.at(TokenKind.PAREN_OPEN)) {
    ctx.expect(TokenKind.PAREN_OPEN)
    const parameters: Ast.Expression[] = []
    while (!ctx.at(TokenKind.PAREN_CLOSE)) {
      parameters.push(parseExpression(ctx))
      if (!ctx.at(TokenKind.COMMA)) {
        break
      }
      ctx.expect(TokenKind.COMMA)
    }
    const { end } = ctx.expect(TokenKind.PAREN_CLOSE)
    result = new Ast.FunctionCall(
      result,
      parameters,
      { start, end }
    )
  }
  return result
}
