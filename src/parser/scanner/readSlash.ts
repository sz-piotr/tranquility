import { TokenKind } from '../tokens'
import { ScannerContext } from './ScannerContext'
import { skipCommentBlock } from './skipCommentBlock'
import { skipCommentLine } from './skipCommentLine'
import { read } from './read'

export function readSlash (ctx: ScannerContext) {
  ctx.next()
  const second = ctx.peek()
  if (second === '=') {
    ctx.next()
    return ctx.token(TokenKind.SLASH_EQUALS, '/=')
  } else if (second === '/') {
    ctx.next()
    skipCommentLine(ctx)
    return read(ctx)
  } else if (second === '*') {
    ctx.next()
    skipCommentBlock(ctx)
    return read(ctx)
  }
  return ctx.token(TokenKind.SLASH, '/')
}
