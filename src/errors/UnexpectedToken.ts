import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class UnexpectedToken extends CompilationError {
  constructor (value: string, span?: Span) {
    super(`Unexpected token ${JSON.stringify(value)}`, span)
  }
}
