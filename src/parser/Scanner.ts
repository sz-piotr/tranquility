import { InputStream } from './InputStream'
import { Token, TokenKind } from './tokens'

export class Scanner {
  private current?: Token
  private start = this.stream.location

  constructor (private stream: Readonly<InputStream>) {
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
      this.current = this.readNext()
    }
    return this.current
  }

  next () {
    const token = this.peek()
    this.current = undefined
    return token
  }

  private readNext (): Token {
    this.skipWhile(isWhitespace)
    this.start = this.stream.location

    const char = this.stream.peek()
    switch (char) {
      case undefined: return this.token(TokenKind.EOF)
      case '(': return this.token(TokenKind.PAREN_OPEN)
      case ')': return this.token(TokenKind.PAREN_CLOSE)
      case '[': return this.token(TokenKind.BRACKET_OPEN)
      case ']': return this.token(TokenKind.BRACKET_CLOSE)
      case '{': return this.token(TokenKind.CURLY_OPEN)
      case '}': return this.token(TokenKind.CURLY_CLOSE)
      case ',': return this.token(TokenKind.COMMA)
      case '.': return this.token(TokenKind.DOT)
      case '?': return this.token(TokenKind.QUESTION)
      case '~': return this.token(TokenKind.TILDE)
      case '#': return this.token(TokenKind.HASH)
      case ';': return this.token(TokenKind.SEMICOLON)
      case ':': return this.doubleToken(
        TokenKind.COLON,
        ['=', TokenKind.COLON_EQUALS]
      )
      case '-': return this.doubleToken(
        TokenKind.MINUS,
        ['-', TokenKind.MINUS_MINUS],
        ['=', TokenKind.MINUS_EQUALS],
        ['>', TokenKind.MINUS_RIGHT]
      )
      case '+': return this.doubleToken(
        TokenKind.PLUS,
        ['+', TokenKind.PLUS_PLUS],
        ['=', TokenKind.PLUS_EQUALS]
      )
      case '*': return this.doubleToken(
        TokenKind.STAR,
        ['*', TokenKind.STAR_STAR],
        ['=', TokenKind.STAR_EQUALS]
      )
      case '%': return this.doubleToken(
        TokenKind.PERCENT,
        ['=', TokenKind.PERCENT_EQUALS]
      )
      case '^': return this.doubleToken(
        TokenKind.CARET,
        ['=', TokenKind.CARET_EQUALS]
      )
      case '&': return this.doubleToken(
        TokenKind.AMPERSAND,
        ['&', TokenKind.AMPERSAND_AMPERSAND],
        ['=', TokenKind.AMPERSAND_EQUALS]
      )
      case '|': return this.doubleToken(
        TokenKind.BAR,
        ['|', TokenKind.BAR_BAR],
        ['=', TokenKind.BAR_EQUALS]
      )
      case '>': return this.doubleToken(
        TokenKind.RIGHT,
        ['>', TokenKind.RIGHT_RIGHT],
        ['=', TokenKind.RIGHT_EQUALS]
      )
      case '<': return this.doubleToken(
        TokenKind.LEFT,
        ['<', TokenKind.LEFT_LEFT],
        ['=', TokenKind.LEFT_EQUALS],
        ['>', TokenKind.LEFT_RIGHT]
      )
      case '=': return this.equals()
      case '!': return this.bang()
      case '/': return this.slash()
    }

    if (isNumberChar(char)) {
      return this.number()
    }

    if (isIdentifierChar(char)) {
      return this.identifier()
    }

    return this.token(TokenKind.UNRECOGNIZED)
  }

  private skipWhile (predicate: (value: string) => boolean) {
    while (true) {
      const char = this.stream.peek()
      if (!char || !predicate(char)) {
        break
      }
      this.stream.next()
    }
  }

  private token (kind: TokenKind, value = this.stream.next()): Token {
    return {
      kind,
      value: value || '',
      start: this.start,
      end: this.stream.location
    }
  }

  private doubleToken (
    baseType: TokenKind,
    ...extensions: [string, TokenKind][]
  ) {
    const first = this.stream.next()
    for (const [char, kind] of extensions) {
      if (this.stream.peek() === char) {
        this.stream.next()
        return this.token(kind, first + char)
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
        return this.token(TokenKind.EQUALS_EQUALS_EQUALS, '===')
      }
      return this.token(TokenKind.EQUALS_EQUALS, '==')
    } else if (second === '>') {
      this.stream.next()
      return this.token(TokenKind.EQUALS_RIGHT, '=>')
    }
    return this.token(TokenKind.EQUALS, '=')
  }

  private bang () {
    this.stream.next()
    const second = this.stream.peek()
    if (second === '=') {
      this.stream.next()
      if (this.stream.peek() === '=') {
        this.stream.next()
        return this.token(TokenKind.BANG_EQUALS_EQUALS, '!==')
      }
      return this.token(TokenKind.BANG_EQUALS, '!=')
    }
    return this.token(TokenKind.BANG, '!')
  }

  private slash () {
    this.stream.next()
    const second = this.stream.peek()
    if (second === '=') {
      this.stream.next()
      return this.token(TokenKind.SLASH_EQUALS, '/=')
    } else if (second === '/') {
      this.stream.next()
      this.skipCommentLine()
      return this.next()
    } else if (second === '*') {
      this.stream.next()
      this.skipCommentBlock()
      return this.next()
    }
    return this.token(TokenKind.SLASH, '/')
  }

  private skipCommentLine () {
    while (true) {
      const char = this.stream.peek()
      if (char === undefined || char === '\n' || char === '\r') {
        break
      }
      this.stream.next()
    }
  }

  private skipCommentBlock () {
    let hadStar = false
    let hadSlash = false
    let level = 1
    while (true) {
      const char = this.stream.peek()
      if (char === undefined) {
        break
      } else if (char === '*') {
        if (hadSlash) {
          hadSlash = false
          level += 1
        } else {
          hadStar = true
        }
      } else if (char === '/') {
        if (hadStar) {
          hadStar = false
          level -= 1
        } else {
          hadSlash = true
        }
      } else {
        hadStar = false
        hadSlash = false
      }
      this.stream.next()
      if (level === 0) {
        break
      }
    }
  }

  private number () {
    const value = this.readWhile(isNumberChar)
    return this.token(TokenKind.NUMBER, value)
  }

  private identifier () {
    const value = this.readWhile(isIdentifierChar)
    return this.token(getIdentifierType(value), value)
  }

  private readWhile (predicate: (value?: string) => boolean) {
    let value = ''
    while (predicate(this.stream.peek())) {
      value += this.stream.next()
    }
    return value
  }
}

const isRegex = (re: RegExp) => (char?: string) => !!char && re.test(char)
const isWhitespace = isRegex(/\s/)
const isNumberChar = isRegex(/\d/)
const isIdentifierChar = isRegex(/\w/)

function getIdentifierType (identifier: string) {
  switch (identifier) {
    case 'function': return TokenKind.FUNCTION
    case 'event': return TokenKind.EVENT
    case 'storage': return TokenKind.STORAGE
    case 'contract': return TokenKind.CONTRACT
    case 'let': return TokenKind.LET
    case 'use': return TokenKind.USE
    case 'for': return TokenKind.FOR
    case 'while': return TokenKind.WHILE
    case 'if': return TokenKind.IF
    case 'else': return TokenKind.ELSE
    case 'zero': return TokenKind.ZERO
    case 'return': return TokenKind.RETURN
    case 'true': return TokenKind.BOOLEAN
    case 'false': return TokenKind.BOOLEAN
    default: return TokenKind.IDENTIFIER
  }
}
