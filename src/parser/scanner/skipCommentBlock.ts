import { ScannerContext } from './ScannerContext'

export function skipCommentBlock (ctx: ScannerContext) {
  let hadStar = false
  let hadSlash = false
  let level = 1
  while (true) {
    const char = ctx.peek()
    if (char === undefined) {
      break
    } else if (char === '*') {
      if (hadSlash) {
        hadSlash = false
        level += 1
      } else {
        hadStar = true
      }
    } else if (char === '/') {
      if (hadStar) {
        hadStar = false
        level -= 1
      } else {
        hadSlash = true
      }
    } else {
      hadStar = false
      hadSlash = false
    }
    ctx.next()
    if (level === 0) {
      break
    }
  }
}
