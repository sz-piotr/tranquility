import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function readEquals (ctx: ScannerContext) {
  ctx.next()
  const second = ctx.peek()
  if (second === '=') {
    ctx.next()
    if (ctx.peek() === '=') {
      ctx.next()
      return ctx.token(TokenKind.EQUALS_EQUALS_EQUALS, '===')
    }
    return ctx.token(TokenKind.EQUALS_EQUALS, '==')
  } else if (second === '>') {
    ctx.next()
    return ctx.token(TokenKind.EQUALS_RIGHT, '=>')
  }
  return ctx.token(TokenKind.EQUALS, '=')
}
