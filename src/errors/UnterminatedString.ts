import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class UnterminatedString extends CompilationError {
  constructor (span?: Span) {
    super('Unterminated string literal.', '', span)
  }
}
