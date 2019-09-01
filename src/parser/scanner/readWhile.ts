import { ScannerContext } from './ScannerContext'

export function readWhile (
  ctx: ScannerContext,
  predicate: (value?: string) => boolean
) {
  let value = ''
  while (predicate(ctx.peek())) {
    value += ctx.next()
  }
  return value
}
