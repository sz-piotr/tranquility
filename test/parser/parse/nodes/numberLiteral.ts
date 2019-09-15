import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetRanges } from '../../utils'

export function numberLiteral () {
  it('numberLiteral', () => {
    const result = parse(`
      1
      0
      123
      // 1_000_000
      // 1e18
      // 15.5
      // 1_000.555_555
      // 1_2_3_4
      // 0x1234
      // 0xaAbBcC1234
      // 0xaA_bB_cC_12_34
      // 0b10101011
      // 0b1011_1000_1100_0001
      // 0b1011.0001
      // -50
    `)

    const expected = new Ast.Program([
      new Ast.NumberLiteral('1'),
      new Ast.NumberLiteral('0'),
      new Ast.NumberLiteral('123')
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
