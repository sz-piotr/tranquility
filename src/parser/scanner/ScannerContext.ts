import { InputStream } from '../InputStream'
import { TokenKind, Token } from '../tokens'

export class ScannerContext {
  private start = this.stream.location
  insideString = false
  insideDoubleQuote = false

  constructor (private stream: Readonly<InputStream>) {
  }

  peek () {
    return this.stream.peek()
  }

  next () {
    return this.stream.next()
  }

  begin () {
    this.start = this.stream.location
  }

  token (kind: TokenKind, value = this.stream.next()): Token {
    return {
      kind,
      value: value || '',
      start: this.start,
      end: this.stream.location
    }
  }
}
