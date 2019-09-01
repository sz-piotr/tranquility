import { readBang } from './readBang'
import { readOneOf } from './readOneOf'
import { readEquals } from './readEquals'
import { readIdentifier } from './readIdentifier'
import { isWhitespace, isNumberChar, isIdentifierChar } from './utils'
import { readNumber } from './readNumber'
import { ScannerContext } from './ScannerContext'
import { readSlash } from './readSlash'
import { Token, TokenKind } from '../tokens'
import { readWhile } from './readWhile'

export function readRegular (ctx: ScannerContext): Token {
  readWhile(ctx, isWhitespace)
  ctx.begin()
  const char = ctx.peek()
  switch (char) {
    case undefined: return ctx.token(TokenKind.EOF)
    case '(': return ctx.token(TokenKind.PAREN_OPEN)
    case ')': return ctx.token(TokenKind.PAREN_CLOSE)
    case '[': return ctx.token(TokenKind.BRACKET_OPEN)
    case ']': return ctx.token(TokenKind.BRACKET_CLOSE)
    case '{': return ctx.token(TokenKind.CURLY_OPEN)
    case '}': return ctx.token(TokenKind.CURLY_CLOSE)
    case ',': return ctx.token(TokenKind.COMMA)
    case '.': return ctx.token(TokenKind.DOT)
    case '?': return ctx.token(TokenKind.QUESTION)
    case '~': return ctx.token(TokenKind.TILDE)
    case '#': return ctx.token(TokenKind.HASH)
    case ';': return ctx.token(TokenKind.SEMICOLON)
    case ':': return readOneOf(
      ctx,
      TokenKind.COLON,
      ['=', TokenKind.COLON_EQUALS]
    )
    case '-': return readOneOf(
      ctx,
      TokenKind.MINUS,
      ['-', TokenKind.MINUS_MINUS],
      ['=', TokenKind.MINUS_EQUALS],
      ['>', TokenKind.MINUS_RIGHT]
    )
    case '+': return readOneOf(
      ctx, TokenKind.PLUS,
      ['+', TokenKind.PLUS_PLUS],
      ['=', TokenKind.PLUS_EQUALS]
    )
    case '*': return readOneOf(
      ctx,
      TokenKind.STAR,
      ['*', TokenKind.STAR_STAR],
      ['=', TokenKind.STAR_EQUALS]
    )
    case '%': return readOneOf(
      ctx,
      TokenKind.PERCENT,
      ['=', TokenKind.PERCENT_EQUALS]
    )
    case '^': return readOneOf(
      ctx,
      TokenKind.CARET,
      ['=', TokenKind.CARET_EQUALS]
    )
    case '&': return readOneOf(
      ctx,
      TokenKind.AMPERSAND,
      ['&', TokenKind.AMPERSAND_AMPERSAND],
      ['=', TokenKind.AMPERSAND_EQUALS]
    )
    case '|': return readOneOf(
      ctx,
      TokenKind.BAR,
      ['|', TokenKind.BAR_BAR],
      ['=', TokenKind.BAR_EQUALS]
    )
    case '>': return readOneOf(
      ctx,
      TokenKind.RIGHT,
      ['>', TokenKind.RIGHT_RIGHT],
      ['=', TokenKind.RIGHT_EQUALS]
    )
    case '<': return readOneOf(
      ctx,
      TokenKind.LEFT,
      ['<', TokenKind.LEFT_LEFT],
      ['=', TokenKind.LEFT_EQUALS], ['>', TokenKind.LEFT_RIGHT]
    )
    case '=': return readEquals(ctx)
    case '!': return readBang(ctx)
    case '/': return readSlash(ctx)
    case '\'':
      ctx.isInString = true
      ctx.doubleQuote = false
      return ctx.token(TokenKind.SINGLE_QUOTE)
    case '"':
      ctx.isInString = true
      ctx.doubleQuote = true
      return ctx.token(TokenKind.DOUBLE_QUOTE)
  }
  if (isNumberChar(char)) {
    return readNumber(ctx)
  }
  if (isIdentifierChar(char)) {
    return readIdentifier(ctx)
  }
  return ctx.token(TokenKind.UNRECOGNIZED)
}
