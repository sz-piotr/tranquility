import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class InvalidCharacter extends CompilationError {
  constructor (character: string, span?: Span) {
    super(`Invalid character ${JSON.stringify(character)}`, span)
  }
}
