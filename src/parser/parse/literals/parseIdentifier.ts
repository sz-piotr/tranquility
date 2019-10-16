import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import * as Ast from '../../ast'

export function parseIdentifier (ctx: ParserContext) {
  const { start, end, value } = ctx.expect(TokenKind.IDENTIFIER)
  return new Ast.Identifier(value, { start, end })
}
