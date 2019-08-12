import { expect } from 'chai'
import { Scanner } from '../../../src/scanner/Scanner'
import { token, resetLocation } from '../utils'
import { TokenType } from '../../../src/scanner/tokens'

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
      token(TokenType.IDENTIFIER, 'hello'),
      token(TokenType.IDENTIFIER, 'foo'),
      token(TokenType.IDENTIFIER, 'bar'),
      token(TokenType.IDENTIFIER, 'yo'),
      token(TokenType.EOF, '')
    ])
  })
}
