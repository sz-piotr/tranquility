import { isHexDigit } from './utils'
import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function byteEscape (ctx: ScannerContext) {
  ctx.next()
  const first = ctx.peek()
  if (isHexDigit(first)) {
    ctx.next()
    const second = ctx.peek()
    if (isHexDigit(second)) {
      ctx.next()
      return ctx.token(
        TokenKind.STRING_ESCAPE_BYTE,
        String.fromCharCode(parseInt(first + second, 16))
      )
    }
    return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\x' + first)
  }
  return ctx.token(TokenKind.STRING_INVALID_ESCAPE, '\\x')
}
