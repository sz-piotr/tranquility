import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetRanges } from '../../utils'

export function zeroLiteral () {
  it('zeroLiteral', () => {
    const result = parse(`
      zero
    `)

    const expected = Ast.program([
      Ast.zeroLiteral()
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
