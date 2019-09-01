import { byteEscape } from './byteEscape'
import { isValidStringContent } from './utils'
import { readOutsideString } from './readOutsideString'
import { readWhile } from './readWhile'
import { ScannerContext } from './ScannerContext'
import { Token, TokenKind } from '../tokens'

export function readInsideString (ctx: ScannerContext): Token {
  ctx.begin()
  const char = ctx.peek()
  if (char === undefined || char === '\n' || char === '\r') {
    ctx.insideString = false
    return readOutsideString(ctx)
  } else if (!ctx.insideDoubleQuote && char === '\'') {
    ctx.insideString = false
    return ctx.token(TokenKind.SINGLE_QUOTE)
  } else if (ctx.insideDoubleQuote && char === '"') {
    ctx.insideString = false
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
      case 'x': return byteEscape(ctx)
      case '\n': return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
      case '\r': return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
      case undefined: return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\')
    }
    ctx.next()
    return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\' + char)
  }
  const content = readWhile(
    ctx,
    char => !!char && isValidStringContent(char, ctx.insideDoubleQuote)
  )
  if (content) {
    return ctx.token(TokenKind.STRING_CONTENT, content)
  } else {
    return ctx.token(TokenKind.STRING_INVALID_CHAR)
  }
}
