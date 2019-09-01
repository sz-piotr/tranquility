import { bang } from './bang'
import { doubleToken } from './doubleToken'
import { equals } from './equals'
import { identifier } from './identifier'
import { isWhitespace, isNumberChar, isIdentifierChar } from './utils'
import { number } from './number'
import { ScannerContext } from './ScannerContext'
import { skipWhile } from './skipWhile'
import { slash } from './slash'
import { Token, TokenKind } from '../tokens'

export function readOutsideString (ctx: ScannerContext): Token {
  skipWhile(ctx, isWhitespace)
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
    case ':': return doubleToken(
      ctx,
      TokenKind.COLON,
      ['=', TokenKind.COLON_EQUALS]
    )
    case '-': return doubleToken(
      ctx,
      TokenKind.MINUS,
      ['-', TokenKind.MINUS_MINUS],
      ['=', TokenKind.MINUS_EQUALS],
      ['>', TokenKind.MINUS_RIGHT]
    )
    case '+': return doubleToken(
      ctx, TokenKind.PLUS,
      ['+', TokenKind.PLUS_PLUS],
      ['=', TokenKind.PLUS_EQUALS]
    )
    case '*': return doubleToken(
      ctx,
      TokenKind.STAR,
      ['*', TokenKind.STAR_STAR],
      ['=', TokenKind.STAR_EQUALS]
    )
    case '%': return doubleToken(
      ctx,
      TokenKind.PERCENT,
      ['=', TokenKind.PERCENT_EQUALS]
    )
    case '^': return doubleToken(
      ctx,
      TokenKind.CARET,
      ['=', TokenKind.CARET_EQUALS]
    )
    case '&': return doubleToken(
      ctx,
      TokenKind.AMPERSAND,
      ['&', TokenKind.AMPERSAND_AMPERSAND],
      ['=', TokenKind.AMPERSAND_EQUALS]
    )
    case '|': return doubleToken(
      ctx,
      TokenKind.BAR,
      ['|', TokenKind.BAR_BAR],
      ['=', TokenKind.BAR_EQUALS]
    )
    case '>': return doubleToken(
      ctx,
      TokenKind.RIGHT,
      ['>', TokenKind.RIGHT_RIGHT],
      ['=', TokenKind.RIGHT_EQUALS]
    )
    case '<': return doubleToken(
      ctx,
      TokenKind.LEFT,
      ['<', TokenKind.LEFT_LEFT],
      ['=', TokenKind.LEFT_EQUALS], ['>', TokenKind.LEFT_RIGHT]
    )
    case '=': return equals(ctx)
    case '!': return bang(ctx)
    case '/': return slash(ctx)
    case '\'':
      ctx.insideString = true
      ctx.insideDoubleQuote = false
      return ctx.token(TokenKind.SINGLE_QUOTE)
    case '"':
      ctx.insideString = true
      ctx.insideDoubleQuote = true
      return ctx.token(TokenKind.DOUBLE_QUOTE)
  }
  if (isNumberChar(char)) {
    return number(ctx)
  }
  if (isIdentifierChar(char)) {
    return identifier(ctx)
  }
  return ctx.token(TokenKind.UNRECOGNIZED)
}
