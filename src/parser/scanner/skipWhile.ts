import { ScannerContext } from './ScannerContext'

export function skipWhile (
  ctx: ScannerContext,
  predicate: (value: string) => boolean
) {
  while (true) {
    const char = ctx.peek()
    if (!char || !predicate(char)) {
      break
    }
    ctx.next()
  }
}
