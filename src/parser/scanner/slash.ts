import { TokenKind } from '../tokens'
import { ScannerContext } from './ScannerContext'
import { skipCommentBlock } from './skipCommentBlock'
import { skipCommentLine } from './skipCommentLine'
import { readNext } from './readNext'

export function slash (ctx: ScannerContext) {
  ctx.next()
  const second = ctx.peek()
  if (second === '=') {
    ctx.next()
    return ctx.token(TokenKind.SLASH_EQUALS, '/=')
  } else if (second === '/') {
    ctx.next()
    skipCommentLine(ctx)
    return readNext(ctx)
  } else if (second === '*') {
    ctx.next()
    skipCommentBlock(ctx)
    return readNext(ctx)
  }
  return ctx.token(TokenKind.SLASH, '/')
}
