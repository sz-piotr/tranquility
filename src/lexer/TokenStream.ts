import { InputStream } from './InputStream'
import { isKeyword, isAlphanumericOperator } from './keywords'

export interface Token {
  type: string,
  value: string,
  start: number,
  end: number
}

export class TokenStream {
  private current: Token | null = null
  public constructor (
    private stream: Readonly<InputStream>
  ) {
  }

  public static fromString(source: string) {
    return new TokenStream(new InputStream(source))
  }

  public peek() {
    return this.current || (this.current = this.readNext())
  }

  public next() {
    const token = this.current || this.readNext()
    this.current = null
    return token
  }

  private readNext() {
    this.skipWhile(isWhitespace)

    const start = this.stream.location
    const char = this.stream.peek()

    if (char === '') {
      return {
        type: 'eof',
        value: '',
        start,
        end: this.stream.location
      }
    }

    if (char === '\r') {
      let value = this.stream.next()
      if (this.stream.peek() === '\n') {
        value += this.stream.next()
      }
      return {
        type: 'newline',
        value,
        start,
        end: this.stream.location
      }
    }

    if (char === '\n') {
      return {
        type: 'newline',
        value: this.stream.next(),
        start,
        end: this.stream.location
      }
    }

    if (isNumberChar(char)) {
      const value = this.readWhile(isNumberChar)
      return {
        type: 'number',
        value,
        start,
        end: this.stream.location
      }
    }

    if (isIdentifierChar(char)) {
      const value = this.readWhile(isIdentifierChar)
      return {
        type: getIdentifierType(value),
        value,
        start,
        end: this.stream.location
      }
    }

    if (isPunctuationChar(char)) {
      return {
        type: 'punctuation',
        value: this.stream.next(),
        start,
        end: this.stream.location
      }
    }

    if (isSingleCharOperator(char)) {
      return {
        type: 'operator',
        value: this.stream.next(),
        start,
        end: this.stream.location
      }
    }

    if (isMaybeDoubleCharOperator(char)) {
      let value = this.stream.next()
      if (this.stream.peek() === '=') {
        value += this.stream.next()
      }
      return {
        type: 'operator',
        value,
        start,
        end: this.stream.location
      }
    }

    if (char === '!') {
      this.stream.next()
      if (this.stream.next() === '=') {
        return {
          type: 'operator',
          value: '!=',
          start,
          end: this.stream.location
        }
      } else {
        throw new Error('Unrecognized character "!"')
      }
    }

    throw new Error(`Unrecognized character "${char}"`)
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

const singleCharOperators = ['+', '-', '*', '/', '%']
function isSingleCharOperator(char: string) {
  return singleCharOperators.includes(char)
}

const maybeDoubleCharOperators = ['=', '>', '<']
function isMaybeDoubleCharOperator(char: string) {
  return maybeDoubleCharOperators.includes(char)
}

const punctuationChars = ['(', ')', '[', ']', ',', ';']
function isPunctuationChar(char: string) {
  return punctuationChars.includes(char)
}

function getIdentifierType(identifier: string) {
  if (isAlphanumericOperator(identifier)) {
    return 'operator'
  } else if(isKeyword(identifier)) {
    return 'keyword'
  } else {
    return 'identifier'
  }
}
