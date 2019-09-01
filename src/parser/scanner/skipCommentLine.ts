import { ScannerContext } from './ScannerContext'

export function skipCommentLine (ctx: ScannerContext) {
  while (true) {
    const char = ctx.peek()
    if (char === undefined || char === '\n' || char === '\r') {
      break
    }
    ctx.next()
  }
}
