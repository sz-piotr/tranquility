import { InputStream } from './InputStream'
import { Token, TokenType } from './tokens'

export class Scanner {
  private current?: Token
  private start = this.stream.location

  public constructor (private stream: Readonly<InputStream>) {
  }

  public static fromString(source: string) {
    return new Scanner(new InputStream(source))
  }

  public static tokenize(source: string) {
    const scanner = Scanner.fromString(source)
    const tokens: Token[] = []
    do {
      tokens.push(scanner.next())
    } while (tokens[tokens.length - 1].type !== TokenType.EOF)
    return tokens
  }

  public peek() {
    if (!this.current) {
      this.current = this.readNext()
    }
    return this.current
  }

  public next() {
    const token = this.peek()
    this.current = undefined
    return token
  }

  private readNext(): Token {
    this.skipWhile(isWhitespace)
    this.start = this.stream.location

    const char = this.stream.peek()
    switch (char) {
      case undefined: return this.token(TokenType.EOF)
      case '(': return this.token(TokenType.PAREN_OPEN)
      case ')': return this.token(TokenType.PAREN_CLOSE)
      case '[': return this.token(TokenType.BRACKET_OPEN)
      case ']': return this.token(TokenType.BRACKET_CLOSE)
      case '{': return this.token(TokenType.CURLY_OPEN)
      case '}': return this.token(TokenType.CURLY_CLOSE)
      case ',': return this.token(TokenType.COMMA)
      case '.': return this.token(TokenType.DOT)
      case '?': return this.token(TokenType.QUESTION)
      case '~': return this.token(TokenType.TILDE)
      case ';': return this.token(TokenType.SEMICOLON)
      case ':': return this.maybeDouble(
        TokenType.COLON,
        ['=', TokenType.COLON_EQUALS],
      )
      case '=': return this.equals()
      case '-': return this.maybeDouble(
        TokenType.MINUS,
        ['-', TokenType.MINUS_MINUS],
        ['=', TokenType.MINUS_EQUALS],
        ['>', TokenType.MINUS_RIGHT],
      )
    }

    return this.fail()
  }

  private skipWhile(predicate: (value: string) => boolean) {
    while (true) {
      const char = this.stream.peek()
      if (!char || !predicate(char)) {
        break
      }
      this.stream.next()
    }
  }

  private maybeDouble (
    baseType: TokenType,
    ...extensions: [string, TokenType][]
  ) {
    const first = this.stream.next()
    const second = this.stream.peek()
    for (const [char, type] of extensions) {
      if (this.stream.peek() === char) {
        this.stream.next()
        return this.token(type, first + char)
      }
    }
    return this.token(baseType, first)
  }

  private equals () {
    this.stream.next()
    const second = this.stream.peek()
    if (second === '=') {
      this.stream.next()
      if (this.stream.peek() === '=') {
        this.stream.next()
        return this.token(TokenType.EQUALS_EQUALS_EQUALS, '===')
      }
      return this.token(TokenType.EQUALS_EQUALS, '==')
    } else if (second === '>') {
      this.stream.next()
      return this.token(TokenType.EQUALS_RIGHT, '=>')
    }
    return this.token(TokenType.EQUALS, '=')
  }

  private maybeNumber () {
    const char = this.stream.peek()
    if (char && isNumberChar(char)) {
      const value = this.readWhile(isNumberChar)
      return this.token(TokenType.NUMBER, value)
    }
  }

  private maybeIdentifier () {
    const char = this.stream.peek()
    if (char && isIdentifierChar(char)) {
      const value = this.readWhile(isIdentifierChar)
      return this.token(getIdentifierType(value), value)
    }
  }

  private readWhile(predicate: (value: string) => boolean) {
    let value = ''
    const char = this.stream.peek()
    while (char && predicate(char)) {
      value += this.stream.next()
    }
    return value
  }

  private token(type: TokenType, value = this.stream.next()): Token {
    return {
      type,
      value: value || '',
      start: this.start,
      end: this.stream.location
    }
  }

  private fail (): never {
    const char = this.stream.peek()
    const at = this.stream.location
    throw new TypeError(`Unrecognized character ${JSON.stringify(char)} at ${at}`)
  }
}

const isRegex = (re: RegExp) => (char: string) => re.test(char)
const isWhitespace = isRegex(/\s/)
const isNumberChar = isRegex(/\d/)
const isIdentifierChar = isRegex(/\w/)

function getIdentifierType(identifier: string) {
  switch (identifier) {
    case 'let': return TokenType.LET
    case 'function': return TokenType.FUNCTION
    case 'for': return TokenType.FOR
    case 'while': return TokenType.WHILE
    case 'if': return TokenType.IF
    case 'else': return TokenType.ELSE
    default: return TokenType.IDENTIFIER
  }
}
