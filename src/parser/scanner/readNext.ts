import { readInsideString } from './readInsideString'
import { readOutsideString } from './readOutsideString'
import { ScannerContext } from './ScannerContext'
import { Token } from '../tokens'

export function readNext (ctx: ScannerContext): Token {
  return ctx.insideString
    ? readInsideString(ctx)
    : readOutsideString(ctx)
}
