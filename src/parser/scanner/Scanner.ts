import { InputStream } from './InputStream'
import { Token, TokenKind } from '../tokens'
import { ScannerContext } from './ScannerContext'
import { read } from './read'

export class Scanner {
  private current?: Token
  private context: ScannerContext

  constructor (stream: Readonly<InputStream>) {
    this.context = new ScannerContext(stream)
  }

  static fromString (source: string) {
    return new Scanner(new InputStream(source))
  }

  static tokenize (source: string) {
    const scanner = Scanner.fromString(source)
    const tokens: Token[] = []
    do {
      tokens.push(scanner.next())
    } while (tokens[tokens.length - 1].kind !== TokenKind.EOF)
    return tokens
  }

  peek () {
    if (!this.current) {
      this.current = read(this.context)
    }
    return this.current
  }

  next () {
    const token = this.peek()
    this.current = undefined
    return token
  }
}
