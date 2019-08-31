import { expect } from 'chai'
import { Scanner } from '../../../src/parser/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token, resetLocation } from '../utils'

export function strings () {
  it.skip('strings', () => {
    const source = `
      "Hello World!"
    `
    const tokens = Scanner.tokenize(source).map(resetLocation)

    expect(tokens).to.deep.equal([
      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_CONTENT, 'Hello World!'),
      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.EOF, '')
    ])
  })
}
