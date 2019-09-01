import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetRanges } from '../../utils'

export function booleanLiteral () {
  it('booleanLiteral', () => {
    const result = parse(`
      true
      false
    `)

    const expected = Ast.program([
      Ast.booleanLiteral(true),
      Ast.booleanLiteral(false)
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
