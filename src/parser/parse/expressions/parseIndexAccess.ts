import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import { Expression, IndexAccess } from '../../ast'
import { parseExpression } from './parseExpression'
import { Location } from '../../location'

export function parseIndexAccess (ctx: ParserContext, result: Expression, start: Location) {
  ctx.expect(TokenKind.BRACKET_OPEN)
  const expression = parseExpression(ctx)
  const { end } = ctx.expect(TokenKind.BRACKET_CLOSE)
  return new IndexAccess(result, expression, { start, end })
}
