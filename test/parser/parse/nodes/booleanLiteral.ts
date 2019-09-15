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

    const expected = new Ast.Program([
      new Ast.BooleanLiteral(true),
      new Ast.BooleanLiteral(false)
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
