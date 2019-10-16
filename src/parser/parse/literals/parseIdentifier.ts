import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import { Identifier } from '../../ast'

export function parseIdentifier (ctx: ParserContext) {
  const { start, end, value } = ctx.expect(TokenKind.IDENTIFIER)
  return new Identifier(value, { start, end })
}
