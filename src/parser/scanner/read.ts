import { readString } from './readString'
import { readRegular } from './readRegular'
import { ScannerContext } from './ScannerContext'
import { Token } from '../tokens'

export function read (ctx: ScannerContext): Token {
  return ctx.isInString
    ? readString(ctx)
    : readRegular(ctx)
}
