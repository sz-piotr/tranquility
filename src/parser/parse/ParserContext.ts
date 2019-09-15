import { Scanner } from '../scanner/Scanner'
import * as Err from '../../errors'
import { TokenKind } from '../tokens'

export class ParserContext {
  readonly errors: Err.Error[] = []

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

  error (e: Err.Error) {
    this.errors.push(e)
  }

  fail (): never {
    throw new TypeError('Unexpected token')
  }
}
