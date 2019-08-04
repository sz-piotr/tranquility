import { InputStream } from './InputStream'
import { Token, TokenType } from './tokens'

export class TokenStream {
  private current?: Token
  public constructor (
    private stream: Readonly<InputStream>
  ) {
  }

  public static fromString(source: string) {
    return new TokenStream(new InputStream(source))
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

    const char = this.stream.peek()

    switch (char) {
      case '': return this.token(TokenType.EOF, '')
      case '\n': return this.token(TokenType.NEWLINE)
      case '(': return this.token(TokenType.LEFT_PAREN)
      case ')': return this.token(TokenType.RIGHT_PAREN)
      case '[': return this.token(TokenType.LEFT_BRACKET)
      case ']': return this.token(TokenType.RIGHT_BRACKET)
      case '{': return this.token(TokenType.LEFT_BRACE)
      case '}': return this.token(TokenType.RIGHT_BRACE)
      case ',': return this.token(TokenType.COMMA)
      case '.': return this.token(TokenType.DOT)
      case ';': return this.token(TokenType.SEMICOLON)
      case '-': return this.token(TokenType.MINUS)
      case '+': return this.token(TokenType.PLUS)
      case '*': return this.token(TokenType.STAR)
      case '/': return this.token(TokenType.SLASH)
    }

    let token =
      this.maybeDouble('!', TokenType.BANG, '=', TokenType.BANG_EQUAL) ||
      this.maybeDouble('=', TokenType.EQUAL, '=', TokenType.EQUAL_EQUAL) ||
      this.maybeDouble('>', TokenType.GREATER, '=', TokenType.GREATER_EQUAL) ||
      this.maybeDouble('<', TokenType.LESS, '=', TokenType.LESS_EQUAL) ||
      this.maybeDouble('\r', TokenType.NEWLINE, '\n', TokenType.NEWLINE)

    if (token) {
      return token
    }

    if (isNumberChar(char)) {
      const value = this.readWhile(isNumberChar)
      return this.token(TokenType.NUMBER, value)
    }

    if (isIdentifierChar(char)) {
      const value = this.readWhile(isIdentifierChar)
      return this.token(getIdentifierType(value), value)
    }

    throw new Error(`Unrecognized character "${char}"`)
  }

  private token(type: TokenType, value = this.stream.next()): Token {
    const end = this.stream.location
    return { type, value, start: end - value.length, end }
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

  private skipWhile(predicate: (value: string) => boolean) {
    while (predicate(this.stream.peek())) {
      this.stream.next()
    }
  }

  private readWhile(predicate: (value: string) => boolean) {
    let value = ''
    while (predicate(this.stream.peek())) {
      value += this.stream.next()
    }
    return value
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
