import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseExpression } from './parseExpression'
import { parseLiteral } from './literals/parseLiteral'

export function parseLiteralOrParenthesized (ctx: ParserContext) {
  if (ctx.at(TokenKind.PAREN_OPEN)) {
    const { start } = ctx.next()
    const expression = parseExpression(ctx)
    const { end } = ctx.expect(TokenKind.PAREN_CLOSE)
    expression.span = { start, end }
    return expression
  }
  return parseLiteral(ctx)
}
