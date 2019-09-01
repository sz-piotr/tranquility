import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function readOneOf (
  ctx: ScannerContext,
  baseType: TokenKind,
  ...extensions: [string, TokenKind][]
) {
  const first = ctx.next()
  for (const [char, kind] of extensions) {
    if (ctx.peek() === char) {
      ctx.next()
      return ctx.token(kind, first + char)
    }
  }
  return ctx.token(baseType, first)
}
