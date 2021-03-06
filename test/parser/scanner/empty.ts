import { expect } from 'chai'
import { Scanner } from '../../../src/parser/scanner/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token } from '../utils'

export function empty () {
  it('empty string', () => {
    const source = ''
    const tokens = Scanner.scan(source)

    expect(tokens).to.deep.equal([
      token(TokenKind.EOF, '', [0, 0, 0], [0, 0, 0])
    ])
  })
}
