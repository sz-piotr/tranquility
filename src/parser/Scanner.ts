import { InputStream } from './InputStream'
import { Token, TokenType } from './tokens'

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
    } while (tokens[tokens.length - 1].type !== TokenType.EOF)
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
      case '#': return this.token(TokenType.HASH)
      case ';': return this.token(TokenType.SEMICOLON)
      case ':': return this.doubleToken(
        TokenType.COLON,
        ['=', TokenType.COLON_EQUALS]
      )
      case '-': return this.doubleToken(
        TokenType.MINUS,
        ['-', TokenType.MINUS_MINUS],
        ['=', TokenType.MINUS_EQUALS],
        ['>', TokenType.MINUS_RIGHT]
      )
      case '+': return this.doubleToken(
        TokenType.PLUS,
        ['+', TokenType.PLUS_PLUS],
        ['=', TokenType.PLUS_EQUALS]
      )
      case '*': return this.doubleToken(
        TokenType.STAR,
        ['*', TokenType.STAR_STAR],
        ['=', TokenType.STAR_EQUALS]
      )
      case '%': return this.doubleToken(
        TokenType.PERCENT,
        ['=', TokenType.PERCENT_EQUALS]
      )
      case '^': return this.doubleToken(
        TokenType.CARET,
        ['=', TokenType.CARET_EQUALS]
      )
      case '&': return this.doubleToken(
        TokenType.AMPERSAND,
        ['&', TokenType.AMPERSAND_AMPERSAND],
        ['=', TokenType.AMPERSAND_EQUALS]
      )
      case '|': return this.doubleToken(
        TokenType.BAR,
        ['|', TokenType.BAR_BAR],
        ['=', TokenType.BAR_EQUALS]
      )
      case '>': return this.doubleToken(
        TokenType.RIGHT,
        ['>', TokenType.RIGHT_RIGHT],
        ['=', TokenType.RIGHT_EQUALS]
      )
      case '<': return this.doubleToken(
        TokenType.LEFT,
        ['<', TokenType.LEFT_LEFT],
        ['=', TokenType.LEFT_EQUALS],
        ['>', TokenType.LEFT_RIGHT]
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

    return this.token(TokenType.UNRECOGNIZED)
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

  private token (type: TokenType, value = this.stream.next()): Token {
    return {
      type,
      value: value || '',
      start: this.start,
      end: this.stream.location
    }
  }

  private doubleToken (
    baseType: TokenType,
    ...extensions: [string, TokenType][]
  ) {
    const first = this.stream.next()
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

  private bang () {
    this.stream.next()
    const second = this.stream.peek()
    if (second === '=') {
      this.stream.next()
      if (this.stream.peek() === '=') {
        this.stream.next()
        return this.token(TokenType.BANG_EQUALS_EQUALS, '!==')
      }
      return this.token(TokenType.BANG_EQUALS, '!=')
    }
    return this.token(TokenType.BANG, '!')
  }

  private slash () {
    this.stream.next()
    const second = this.stream.peek()
    if (second === '=') {
      this.stream.next()
      return this.token(TokenType.SLASH_EQUALS, '/=')
    } else if (second === '/') {
      this.stream.next()
      this.skipCommentLine()
      return this.next()
    } else if (second === '*') {
      this.stream.next()
      this.skipCommentBlock()
      return this.next()
    }
    return this.token(TokenType.SLASH, '/')
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
    return this.token(TokenType.NUMBER, value)
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
    case 'function': return TokenType.FUNCTION
    case 'event': return TokenType.EVENT
    case 'storage': return TokenType.STORAGE
    case 'contract': return TokenType.CONTRACT
    case 'let': return TokenType.LET
    case 'use': return TokenType.USE
    case 'for': return TokenType.FOR
    case 'while': return TokenType.WHILE
    case 'if': return TokenType.IF
    case 'else': return TokenType.ELSE
    case 'zero': return TokenType.ZERO
    case 'return': return TokenType.RETURN
    case 'true': return TokenType.BOOLEAN
    case 'false': return TokenType.BOOLEAN
    default: return TokenType.IDENTIFIER
  }
}
