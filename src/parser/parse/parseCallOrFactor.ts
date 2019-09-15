import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { parseExpression } from './parseExpression'
import { parseFactor } from './parseFactor'

export function parseCallOrFactor (ctx: ParserContext): Ast.Expression {
  const { start } = ctx.peek()
  let result = parseFactor(ctx)
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
    result = Ast.functionCall(
      result,
      parameters,
      { start, end }
    )
  }
  return result
}
