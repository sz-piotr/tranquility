import { Scanner } from '../scanner/Scanner'
import { CompilationError } from '../../errors'
import { TokenKind } from '../tokens'

export class ParserContext {
  readonly errors: CompilationError[] = []

  constructor (
    private scanner: Scanner
  ) {}

  peek () {
    return this.scanner.peek()
  }

  next () {
    return this.scanner.next()
  }

  at (kind: TokenKind) {
    const token = this.scanner.peek()
    return token.kind === kind
  }

  expect (kind: TokenKind) {
    if (this.at(kind)) {
      return this.scanner.next()
    }
    return this.fail()
  }

  error (e: CompilationError) {
    this.errors.push(e)
  }

  fail (): never {
    throw new TypeError('Unexpected token')
  }
}
