import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function bang (ctx: ScannerContext) {
  ctx.next()
  const second = ctx.peek()
  if (second === '=') {
    ctx.next()
    if (ctx.peek() === '=') {
      ctx.next()
      return ctx.token(TokenKind.BANG_EQUALS_EQUALS, '!==')
    }
    return ctx.token(TokenKind.BANG_EQUALS, '!=')
  }
  return ctx.token(TokenKind.BANG, '!')
}
