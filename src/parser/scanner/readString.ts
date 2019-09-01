import { readEscapeX } from './readEscapeX'
import { isValidStringContent } from './utils'
import { readRegular } from './readRegular'
import { readWhile } from './readWhile'
import { ScannerContext } from './ScannerContext'
import { Token, TokenKind } from '../tokens'

export function readString (ctx: ScannerContext): Token {
  ctx.begin()
  const char = ctx.peek()
  if (char === undefined || char === '\n' || char === '\r') {
    ctx.isInString = false
    return readRegular(ctx)
  } else if (!ctx.doubleQuote && char === '\'') {
    ctx.isInString = false
    return ctx.token(TokenKind.SINGLE_QUOTE)
  } else if (ctx.doubleQuote && char === '"') {
    ctx.isInString = false
    return ctx.token(TokenKind.DOUBLE_QUOTE)
  } else if (char === '\\') {
    ctx.next()
    const char = ctx.peek()
    switch (char) {
      case 'n':
        ctx.next()
        return ctx.token(TokenKind.STRING_ESCAPE_N, '\n')
      case 'r':
        ctx.next()
        return ctx.token(TokenKind.STRING_ESCAPE_R, '\r')
      case 't':
        ctx.next()
        return ctx.token(TokenKind.STRING_ESCAPE_T, '\t')
      case '\'': return ctx.token(TokenKind.STRING_ESCAPE_SINGLE_QUOTE)
      case '"': return ctx.token(TokenKind.STRING_ESCAPE_DOUBLE_QUOTE)
      case '\\': return ctx.token(TokenKind.STRING_ESCAPE_BACKSLASH)
      case 'x': return readEscapeX(ctx)
      case '\n': return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
      case '\r': return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
      case undefined: return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
    }
    ctx.next()
    return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\' + char)
  }
  const content = readWhile(ctx, isValidStringContent(ctx.doubleQuote))
  if (content) {
    return ctx.token(TokenKind.STRING_CONTENT, content)
  } else {
    return ctx.token(TokenKind.STRING_INVALID_CHAR)
  }
}