import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import { location } from '../../../src/parser/location'
import * as Ast from '../../../src/parser/ast'
import * as Err from '../../../src/errors'
import { resetRanges } from '../utils'

export function errorInvalidCharacter () {
  it('errorInvalidCharacter', () => {
    const result = parse('foo § bar')

    const expected = Ast.program([
      Ast.identifier('foo')
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([
      Err.InvalidCharacter('§', {
        start: location(4, 0, 4),
        end: location(5, 0, 5)
      })
    ])
  })
}
