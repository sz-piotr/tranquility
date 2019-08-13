import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

export function literals () {
  it('literals', () => {
    const result = parse(`
      true
      false
      1
      0
      123
    `)

    const expected = Ast.program([
      Ast.booleanLiteral(true),
      Ast.booleanLiteral(false),
      Ast.numberLiteral('1'),
      Ast.numberLiteral('0'),
      Ast.numberLiteral('123')
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}
