import { isHexDigit } from './utils'
import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function readEscapeX (ctx: ScannerContext) {
  ctx.next()
  const first = ctx.peek()
  if (isHexDigit(first)) {
    ctx.next()
    const second = ctx.peek()
    if (isHexDigit(second)) {
      ctx.next()
      const value = String.fromCharCode(parseInt(first + second, 16))
      return ctx.token(TokenKind.STRING_CONTENT, value)
    }
    return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\x' + first)
  }
  return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\x')
}
