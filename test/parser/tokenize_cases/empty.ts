import { expect } from 'chai'
import { Scanner } from '../../../src/parser/Scanner'
import { TokenType } from '../../../src/parser/tokens'
import { token } from '../utils'

export function empty () {
  it('empty string', () => {
    const source = ''
    const tokens = Scanner.tokenize(source)

    expect(tokens).to.deep.equal([
      token(TokenType.EOF, '', [0, 0, 0], [0, 0, 0])
    ])
  })
}
