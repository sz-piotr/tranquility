import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetAstSpans } from '../../utils'

export function zeroLiteral () {
  it('zeroLiteral', () => {
    const result = parse(`
      zero
    `)

    const expected = new Ast.Program([
      new Ast.ZeroLiteral()
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
