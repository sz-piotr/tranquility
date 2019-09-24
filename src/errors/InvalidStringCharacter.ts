import { CompilationError } from './CompilationError'
import { Span } from '../parser/location'

export class InvalidStringCharacter extends CompilationError {
  constructor (character: string, span?: Span) {
    super(
      `Invalid character inside string ${JSON.stringify(character)}.`,
      'In Tranquility strings only support ascii characters. ' +
      'For characters outside the ascii range use escape sequences. ' +
      'For example: "Señorita" should be expressed as "Se\\xF1orita"',
      span
    )
  }
}
