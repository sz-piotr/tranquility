import 'mocha'
import { expect } from 'chai'

import { TokenStream } from '../../src/lexer/TokenStream'
import { keywords } from '../../src/lexer/keywords'

describe('TokenStream', () => {
  it('can tokenize identifiers', () => {
    const stream = TokenStream.fromString('someName')

    expect(stream.peek()).to.deep.equal({
      type: 'identifier',
      value: 'someName',
      start: 0,
      end: 8
    })
  })

  it('can strip whitespace', () => {
    const stream = TokenStream.fromString('  someName')

    expect(stream.peek()).to.deep.equal({
      type: 'identifier',
      value: 'someName',
      start: 2,
      end: 10
    })
  })

  it('can read multiple identifiers', () => {
    const stream = TokenStream.fromString('a bc de')

    expect(stream.next()).to.deep.equal({
      type: 'identifier',
      value: 'a',
      start: 0,
      end: 1
    })

    expect(stream.next()).to.deep.equal({
      type: 'identifier',
      value: 'bc',
      start: 2,
      end: 4
    })

    expect(stream.next()).to.deep.equal({
      type: 'identifier',
      value: 'de',
      start: 5,
      end: 7
    })
  })

  it('peek does not advance the stream', () => {
    const stream = TokenStream.fromString('a')

    const token = stream.peek()

    expect(stream.peek()).to.equal(token)
  })

  it('reads eof as last token', () => {
    const stream = TokenStream.fromString('abc')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: 'eof',
      value: '',
      start: 3,
      end: 3
    })
  })

  it('can read a number token', () => {
    const stream = TokenStream.fromString('123')

    expect(stream.next()).to.deep.equal({
      type: 'number',
      value: '123',
      start: 0,
      end: 3
    })
  })

  it('can read keywords', () => {
    for (const keyword of keywords) {
      const stream = TokenStream.fromString(keyword)

      expect(stream.next()).to.deep.equal({
        type: 'keyword',
        value: keyword,
        start: 0,
        end: keyword.length
      })
    }
  })

  it('can read alphanumeric operators', () => {
    const operators = ['and', 'or', 'not']
    for (const operator of operators) {
      const stream = TokenStream.fromString(`a ${operator} b`)

      stream.next()

      expect(stream.next()).to.deep.equal({
        type: 'operator',
        value: operator,
        start: 2,
        end: 2 + operator.length
      })
    }
  })

  it('can read non alphanumeric operators', () => {
    const operators = [
      '+', '-', '*', '/', '%',
      '<', '<=', '>', '>=',
      '=', '==', '!='
    ]
    for (const operator of operators) {
      const stream = TokenStream.fromString(`a${operator}b`)

      stream.next()

      expect(stream.next()).to.deep.equal({
        type: 'operator',
        value: operator,
        start: 1,
        end: 1 + operator.length
      })
    }
  })

  it('throws for unrecognized characters', () => {
    const stream = TokenStream.fromString('\u0000')
    expect(() => stream.next()).to.throw()
  })

  it('can read punctuation', () => {
    const punctuation = ['(', ')', '[', ']', ',']
    for (const char of punctuation) {
      const stream = TokenStream.fromString(`a${char}b`)

      stream.next()

      expect(stream.next()).to.deep.equal({
        type: 'punctuation',
        value: char,
        start: 1,
        end: 2
      })
    }
  })

  it('can read \\n newline', () => {
    const stream = TokenStream.fromString('a\n\nb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\n',
      start: 1,
      end: 2
    })

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\n',
      start: 2,
      end: 3
    })
  })

  it('can read \\r newline', () => {
    const stream = TokenStream.fromString('a\r\rb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\r',
      start: 1,
      end: 2
    })

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\r',
      start: 2,
      end: 3
    })
  })

  it('can read \\r\\n newline', () => {
    const stream = TokenStream.fromString('a\r\n\r\nb')

    stream.next()

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\r\n',
      start: 1,
      end: 3
    })

    expect(stream.next()).to.deep.equal({
      type: 'newline',
      value: '\r\n',
      start: 3,
      end: 5
    })
  })
})
