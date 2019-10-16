import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import { StringLiteral } from '../../ast'
import {
  SingleQuoteString,
  UnterminatedString,
  InvalidStringCharacter,
  InvalidStringEscape,
} from '../../../errors'

export function parseString (ctx: ParserContext) {
  const { start } = ctx.at(TokenKind.SINGLE_QUOTE)
    ? ctx.expect(TokenKind.SINGLE_QUOTE)
    : ctx.expect(TokenKind.DOUBLE_QUOTE)
  let content = ''

  while (true) {
    if (ctx.at(TokenKind.DOUBLE_QUOTE)) {
      const { end } = ctx.next()
      return new StringLiteral(content, { start, end })
    } if (ctx.at(TokenKind.SINGLE_QUOTE)) {
      const { end } = ctx.next()
      ctx.error(new SingleQuoteString({ start, end }))
      return new StringLiteral(content, { start, end })
    } else if (ctx.at(TokenKind.STRING_END)) {
      const end = ctx.next().start
      ctx.error(new UnterminatedString({ start, end }))
      return new StringLiteral(content, { start, end })
    } else if (ctx.at(TokenKind.STRING_CONTENT)) {
      const token = ctx.next()
      content += token.value
    } else if (ctx.at(TokenKind.STRING_INVALID_CHAR)) {
      const token = ctx.next()
      ctx.error(new InvalidStringCharacter(token.value, token))
    } else if (ctx.at(TokenKind.STRING_INVALID_ESCAPE)) {
      const token = ctx.next()
      ctx.error(new InvalidStringEscape(token.value, token))
    } else {
      return ctx.fail()
    }
  }
}
