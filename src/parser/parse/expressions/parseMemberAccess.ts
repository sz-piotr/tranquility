import { ParserContext } from '../ParserContext'
import { parseIdentifier } from '../literals/parseIdentifier'
import { Expression, MemberAccess } from '../../ast'
import { Location } from '../../location'
import { TokenKind } from '../../tokens'

export function parseMemberAccess (ctx: ParserContext, result: Expression, start: Location) {
  ctx.expect(TokenKind.DOT)
  const identifier = parseIdentifier(ctx)
  const { end } = identifier.span
  return new MemberAccess(result, identifier, { start, end })
}
