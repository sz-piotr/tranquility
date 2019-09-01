import { isNumberChar } from './utils'
import { readWhile } from './readWhile'
import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function number (ctx: ScannerContext) {
  const value = readWhile(ctx, isNumberChar)
  return ctx.token(TokenKind.NUMBER, value)
}
