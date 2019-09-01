import { expect } from 'chai'
import { Scanner } from '../../../src/parser/scanner/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token } from '../utils'

export function keywords () {
  it('keywords', () => {
    const keywords: [TokenKind, string][] = [
      [TokenKind.FUNCTION, 'function'],
      [TokenKind.EVENT, 'event'],
      [TokenKind.STORAGE, 'storage'],
      [TokenKind.CONTRACT, 'contract'],
      [TokenKind.LET, 'let'],
      [TokenKind.USE, 'use'],
      [TokenKind.FOR, 'for'],
      [TokenKind.WHILE, 'while'],
      [TokenKind.IF, 'if'],
      [TokenKind.ELSE, 'else'],
      [TokenKind.ZERO, 'zero'],
      [TokenKind.RETURN, 'return'],

      [TokenKind.BOOLEAN, 'true'],
      [TokenKind.BOOLEAN, 'false'],

      [TokenKind.IDENTIFIER, 'blah']
    ]
    const source = keywords.map(([, value]) => value).join(' ')
    const tokens = Scanner.tokenize(source)

    let i = 0
    let last = 0

    function t (kind: TokenKind, value: string) {
      i += last
      last = value.length + 1
      return token(kind, value, i)
    }

    expect(tokens).to.deep.equal([
      ...keywords.map(([kind, value]) => t(kind, value)),
      token(TokenKind.EOF, '', source.length)
    ])
  })
}
