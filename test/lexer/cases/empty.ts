import { expect } from 'chai'
import { Scanner } from '../../../src/scanner/Scanner'
import { token } from '../utils'
import { TokenType } from '../../../src/scanner/tokens'

export function empty () {
  it('empty string', () => {
    const source = ''
    const tokens = Scanner.tokenize(source)

    expect(tokens).to.deep.equal([
      token(TokenType.EOF, '', [0, 0, 0], [0, 0, 0])
    ])
  })
}
