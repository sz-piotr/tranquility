import 'mocha'
import { expect } from 'chai'

import { Scanner } from '../../src/scanner/Scanner'
import { TokenType } from '../../src/scanner/tokens'

describe('TokenStream', () => {
  it('can tokenize identifiers', () => {
    const stream = Scanner.fromString('someName')

    expect(stream.peek()).to.deep.equal({
      type: TokenType.IDENTIFIER,
      value: 'someName',
      start: 0,
      end: 8
    })
  })

  it('can strip whitespace', () => {
    const stream = Scanner.fromString('  someName')

    expect(stream.peek()).to.deep.equal({
      type: TokenType.IDENTIFIER,
      value: 'someName',
      start: 2,
      end: 10
    })
  })

  it('can read multiple identifiers', () => {
    const stream = Scanner.fromString('a bc de')

    expect(stream.next()).to.deep.equal({
      type: TokenType.IDENTIFIER,
      value: 'a',
      start: 0,
      end: 1
    })

    expect(stream.next()).to.deep.equal({
      type: TokenType.IDENTIFIER,
      value: 'bc',
      start: 2,
      end: 4
    })

    expect(stream.next()).to.deep.equal({
      type: TokenType.IDENTIFIER,
      value: 'de',
      start: 5,
      end: 7
    })
  })

  it('peek does not advance the stream', () => {
    const stream = Scanner.fromString('a')

    const token = stream.peek()

    expect(stream.peek()).to.equal(token)
  })

  it('reads eof as last token', () => {
    const stream = Scanner.fromString('abc')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: TokenType.EOF,
      value: '',
      start: 3,
      end: 3
    })
  })

  it('can read a number token', () => {
    const stream = Scanner.fromString('123')

    expect(stream.next()).to.deep.equal({
      type: TokenType.NUMBER,
      value: '123',
      start: 0,
      end: 3
    })
  })

  it('can read keywords', () => {
    const sequences = {
      'let': TokenType.LET,
      'function': TokenType.FUNCTION,
      'for': TokenType.FOR,
      'while': TokenType.WHILE,
      'if': TokenType.IF,
      'then': TokenType.THEN,
      'else': TokenType.ELSE,
      'true': TokenType.TRUE,
      'false': TokenType.FALSE
    }
    const keys = Object.keys(sequences) as (keyof typeof sequences)[]

    for (const sequence of keys) {
      const stream = Scanner.fromString(sequence)

      expect(stream.next()).to.deep.equal({
        type: sequences[sequence],
        value: sequence,
        start: 0,
        end: sequence.length
      })
    }
  })

  it('can read special character sequences', () => {
    const sequences = {
      '(': TokenType.LEFT_PAREN,
      ')': TokenType.RIGHT_PAREN,
      '[': TokenType.LEFT_BRACKET,
      ']': TokenType.RIGHT_BRACKET,
      '{': TokenType.LEFT_BRACE,
      '}': TokenType.RIGHT_BRACE,
      ',': TokenType.COMMA,
      '.': TokenType.DOT,
      ';': TokenType.SEMICOLON,
      '-': TokenType.MINUS,
      '+': TokenType.PLUS,
      '*': TokenType.STAR,
      '/': TokenType.SLASH,
      '!': TokenType.BANG,
      '!=': TokenType.BANG_EQUAL,
      '=': TokenType.EQUAL,
      '==': TokenType.EQUAL_EQUAL,
      '>': TokenType.GREATER,
      '>=': TokenType.GREATER_EQUAL,
      '<': TokenType.LESS,
      '<=': TokenType.LESS_EQUAL
    }
    const keys = Object.keys(sequences) as (keyof typeof sequences)[]

    for (const sequence of keys) {
      const stream = Scanner.fromString(`a${sequence}b`)

      stream.next()

      expect(stream.next()).to.deep.equal({
        type: sequences[sequence],
        value: sequence,
        start: 1,
        end: 1 + sequence.length
      })
    }
  })

  it('throws for unrecognized characters', () => {
    const stream = Scanner.fromString('\u0000')
    expect(() => stream.next()).to.throw()
  })

  it('can read \\n newline', () => {
    const stream = Scanner.fromString('a\n\nb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\n',
      start: 1,
      end: 2
    })

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\n',
      start: 2,
      end: 3
    })
  })

  it('can read \\r newline', () => {
    const stream = Scanner.fromString('a\r\rb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\r',
      start: 1,
      end: 2
    })

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\r',
      start: 2,
      end: 3
    })
  })

  it('can read \\r\\n newline', () => {
    const stream = Scanner.fromString('a\r\n\r\nb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\r\n',
      start: 1,
      end: 3
    })

    expect(stream.next()).to.deep.equal({
      type: TokenType.NEWLINE,
      value: '\r\n',
      start: 3,
      end: 5
    })
  })
})
