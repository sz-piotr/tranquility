import { ScannerContext } from './ScannerContext'

export function readWhile (
  ctx: ScannerContext,
  predicate: (value: string) => boolean
) {
  let value = ''
  while (true) {
    const char = ctx.peek()
    if (!char || !predicate(char)) {
      break
    }
    value += ctx.next()
  }
  return value
}
