import { InputStream } from './InputStream'
import { Token, TokenType } from './tokens'

export class Scanner {
  private current?: Token
  public constructor (
    private stream: Readonly<InputStream>
  ) {
  }

  public static fromString(source: string) {
    return new Scanner(new InputStream(source))
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

    return (
      this.maybeSingle('', TokenType.EOF, '') ||

      this.maybeSingle('(', TokenType.LEFT_PAREN) ||
      this.maybeSingle(')', TokenType.RIGHT_PAREN) ||
      this.maybeSingle('[', TokenType.LEFT_BRACKET) ||
      this.maybeSingle(']', TokenType.RIGHT_BRACKET) ||
      this.maybeSingle('{', TokenType.LEFT_BRACE) ||
      this.maybeSingle('}', TokenType.RIGHT_BRACE) ||

      this.maybeSingle(',', TokenType.COMMA) ||
      this.maybeSingle('.', TokenType.DOT) ||
      this.maybeSingle(';', TokenType.SEMICOLON) ||

      this.maybeSingle('-', TokenType.MINUS) ||
      this.maybeSingle('+', TokenType.PLUS) ||
      this.maybeSingle('*', TokenType.STAR) ||
      this.maybeSingle('/', TokenType.SLASH) ||

      this.maybeDouble('!', TokenType.BANG, '=', TokenType.BANG_EQUAL) ||
      this.maybeDouble('=', TokenType.EQUAL, '=', TokenType.EQUAL_EQUAL) ||
      this.maybeDouble('>', TokenType.GREATER, '=', TokenType.GREATER_EQUAL) ||
      this.maybeDouble('<', TokenType.LESS, '=', TokenType.LESS_EQUAL) ||

      this.maybeSingle('\n', TokenType.NEWLINE) ||
      this.maybeDouble('\r', TokenType.NEWLINE, '\n', TokenType.NEWLINE) ||

      this.maybeNumber() ||
      this.maybeIdentifier() ||

      this.fail()
    )
  }

  private skipWhile(predicate: (value: string) => boolean) {
    while (predicate(this.stream.peek())) {
      this.stream.next()
    }
  }

  private maybeSingle(char: string, type: TokenType, value?: string) {
    if (this.stream.peek() === char) {
      return this.token(type, value)
    }
  }

  private maybeDouble (
    firstChar: string,
    firstType: TokenType,
    secondChar: string,
    secondType: TokenType
  ) {
    if (this.stream.peek() === firstChar) {
      const value = this.stream.next()
      if (this.stream.peek() === secondChar) {
        return this.token(secondType, value + this.stream.next())
      }
      return this.token(firstType, value)
    }
  }

  private maybeNumber () {
    if (isNumberChar(this.stream.peek())) {
      const value = this.readWhile(isNumberChar)
      return this.token(TokenType.NUMBER, value)
    }
  }

  private maybeIdentifier () {
    if (isIdentifierChar(this.stream.peek())) {
      const value = this.readWhile(isIdentifierChar)
      return this.token(getIdentifierType(value), value)
    }
  }

  private readWhile(predicate: (value: string) => boolean) {
    let value = ''
    while (predicate(this.stream.peek())) {
      value += this.stream.next()
    }
    return value
  }

  private token(type: TokenType, value = this.stream.next()): Token {
    const end = this.stream.location
    return { type, value, start: end - value.length, end }
  }

  private fail (): never {
    const char = this.stream.peek()
    const at = this.stream.location
    throw new TypeError(`Unrecognized character ${JSON.stringify(char)} at ${at}`)
  }
}

function isWhitespace(char: string) {
  return /[^\S\r\n]/.test(char)
}

function isNumberChar(char: string) {
  return /\d/.test(char)
}

function isIdentifierChar(char: string) {
  return /\w/.test(char)
}

function getIdentifierType(identifier: string) {
  switch (identifier) {
    case 'let': return TokenType.LET
    case 'function': return TokenType.FUNCTION
    case 'for': return TokenType.FOR
    case 'while': return TokenType.WHILE
    case 'if': return TokenType.IF
    case 'then': return TokenType.THEN
    case 'else': return TokenType.ELSE
    case 'true': return TokenType.TRUE
    case 'false': return TokenType.FALSE
    default: return TokenType.IDENTIFIER
  }
}
