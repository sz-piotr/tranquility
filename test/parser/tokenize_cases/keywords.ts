import { expect } from 'chai'
import { Scanner } from '../../../src/parser/Scanner'
import { TokenType } from '../../../src/parser/tokens'
import { token } from '../utils'

export function keywords () {
  it('keywords', () => {
    const keywords: [TokenType, string][] = [
      [TokenType.FUNCTION, 'function'],
      [TokenType.EVENT, 'event'],
      [TokenType.STORAGE, 'storage'],
      [TokenType.CONTRACT, 'contract'],
      [TokenType.LET, 'let'],
      [TokenType.USE, 'use'],
      [TokenType.FOR, 'for'],
      [TokenType.WHILE, 'while'],
      [TokenType.IF, 'if'],
      [TokenType.ELSE, 'else'],
      [TokenType.ZERO, 'zero'],
      [TokenType.RETURN, 'return'],

      [TokenType.BOOLEAN, 'true'],
      [TokenType.BOOLEAN, 'false'],

      [TokenType.IDENTIFIER, 'blah']
    ]
    const source = keywords.map(([, value]) => value).join(' ')
    const tokens = Scanner.tokenize(source)

    let i = 0
    let last = 0

    function t (type: TokenType, value: string) {
      i += last
      last = value.length + 1
      return token(type, value, i)
    }

    expect(tokens).to.deep.equal([
      ...keywords.map(([type, value]) => t(type, value)),
      token(TokenType.EOF, '', source.length)
    ])
  })
}
