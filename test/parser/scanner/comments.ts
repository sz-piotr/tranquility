import { expect } from 'chai'
import { Scanner } from '../../../src/parser/scanner/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token, resetLocation } from '../utils'

export function comments () {
  it('comments', () => {
    const source = `
      hello
      // I am a comment
      // I am another comment

      /* I am
       * a glorious
       * multiline
       * comment
       */

      foo /* inline */ bar

      /* nested? /* of /* course */ also */ works */ yo

      /* unterminated
    `
    const tokens = Scanner.tokenize(source).map(resetLocation)

    expect(tokens).to.deep.equal([
      token(TokenKind.IDENTIFIER, 'hello'),
      token(TokenKind.IDENTIFIER, 'foo'),
      token(TokenKind.IDENTIFIER, 'bar'),
      token(TokenKind.IDENTIFIER, 'yo'),
      token(TokenKind.EOF, '')
    ])
  })
}
