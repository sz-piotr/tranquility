import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class InvalidStringCharacter extends CompilationError {
  constructor (character: string, span?: Span) {
    super(
      `Invalid character inside string ${JSON.stringify(character)}.`,
      span
    )
  }
}
