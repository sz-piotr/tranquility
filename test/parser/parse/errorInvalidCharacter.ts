import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import { location } from '../../../src/parser/location'
import * as Ast from '../../../src/parser/ast'
import * as Err from '../../../src/errors'
import { resetAstSpans } from '../utils'

export function errorInvalidCharacter () {
  it('errorInvalidCharacter', () => {
    const result = parse('foo § bar')

    const expected = new Ast.Program([
      new Ast.Identifier('foo')
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([
      new Err.InvalidCharacter('§', {
        start: location(4, 0, 4),
        end: location(5, 0, 5)
      })
    ])
  })
}
