import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseExpression } from './parseExpression'
import { parseLiteral } from './parseLiteral'

export function parseFactor (ctx: ParserContext) {
  if (ctx.at(TokenKind.PAREN_OPEN)) {
    ctx.next()
    const expression = parseExpression(ctx)
    ctx.expect(TokenKind.PAREN_CLOSE)
    return expression
  }
  return parseLiteral(ctx)
}
