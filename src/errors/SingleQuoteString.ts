import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class SingleQuoteString extends CompilationError {
  constructor (span?: Span) {
    super('Single quote string literal.', span)
  }
}
