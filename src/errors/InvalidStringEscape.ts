import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class InvalidStringEscape extends CompilationError {
  constructor (escape: string, span?: Span) {
    super(
      `Invalid escape inside string ${escape}.`,
      'Valid escape sequences include: \\n, \\r, \\t, \\\', \\", \\\\, \\x00',
      span
    )
  }
}
