import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import * as Ast from '../ast'
import * as Err from '../../errors'

export function parseString (ctx: ParserContext) {
  const { start } = ctx.at(TokenKind.SINGLE_QUOTE)
    ? ctx.expect(TokenKind.SINGLE_QUOTE)
    : ctx.expect(TokenKind.DOUBLE_QUOTE)
  let content = ''

  while (true) {
    if (ctx.at(TokenKind.DOUBLE_QUOTE)) {
      const { end } = ctx.next()
      return new Ast.StringLiteral(content, { start, end })
    } if (ctx.at(TokenKind.SINGLE_QUOTE)) {
      const { end } = ctx.next()
      ctx.error(new Err.SingleQuoteString({ start, end }))
      return new Ast.StringLiteral(content, { start, end })
    } else if (ctx.at(TokenKind.STRING_END)) {
      const end = ctx.next().start
      ctx.error(new Err.UnterminatedString({ start, end }))
      return new Ast.StringLiteral(content, { start, end })
    } else if (ctx.at(TokenKind.STRING_CONTENT)) {
      const token = ctx.next()
      content += token.value
    } else if (ctx.at(TokenKind.STRING_INVALID_CHAR)) {
      const token = ctx.next()
      ctx.error(new Err.InvalidStringCharacter(token.value, token))
    } else if (ctx.at(TokenKind.STRING_INVALID_ESCAPE)) {
      const token = ctx.next()
      ctx.error(new Err.InvalidStringEscape(token.value, token))
    } else {
      return ctx.fail()
    }
  }
}
