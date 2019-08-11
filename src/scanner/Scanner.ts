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

    return (
      this.maybeSingle('', TokenType.EOF, '') ||

      this.maybeSingle('(', TokenType.PAREN_LEFT) ||
      this.maybeSingle(')', TokenType.PAREN_RIGHT) ||
      this.maybeSingle('[', TokenType.BRACKET_LEFT) ||
      this.maybeSingle(']', TokenType.BRACKET_RIGHT) ||
      this.maybeSingle('{', TokenType.CURLY_LEFT) ||
      this.maybeSingle('}', TokenType.CURLY_RIGHT) ||

      this.maybeSingle(',', TokenType.COMMA) ||
      this.maybeSingle('.', TokenType.DOT) ||
      this.maybeSingle(';', TokenType.SEMICOLON) ||

      this.maybeSingle('-', TokenType.MINUS) ||
      this.maybeSingle('+', TokenType.PLUS) ||
      this.maybeSingle('*', TokenType.STAR) ||
      this.maybeSingle('/', TokenType.SLASH) ||

      this.maybeDouble('!', TokenType.BANG, '=', TokenType.BANG_EQUAL) ||
      this.maybeDouble('=', TokenType.EQUAL, '=', TokenType.EQUAL_EQUAL) ||
      this.maybeDouble('>', TokenType.RIGHT, '=', TokenType.RIGHT_EQUAL) ||
      this.maybeDouble('<', TokenType.LEFT, '=', TokenType.LEFT_EQUAL) ||

      this.maybeNumber() ||
      this.maybeIdentifier() ||

      this.fail()
    )
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
    const first = this.stream.next()
    if (first === firstChar) {
      const second = this.stream.peek()
      if (second === secondChar) {
        this.stream.next()
        return this.token(secondType, first + second)
      }
      return this.token(firstType, first)
    }
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
      start: this.stream.location, // FIXME: This is incorrect
      end: this.stream.location
    }
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
    case 'else': return TokenType.ELSE
    default: return TokenType.IDENTIFIER
  }
}
