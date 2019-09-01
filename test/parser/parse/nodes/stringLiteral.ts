import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetRanges } from '../../utils'

export function stringLiteral () {
  it.skip('stringLiteral', () => {
    const result = parse(`
      ""
      "value"
      "a b c"
      "a \\"bc\\""
      "I can't believe it!"
    `)

    const expected = Ast.program([
      Ast.stringLiteral(''),
      Ast.stringLiteral('a b c'),
      Ast.stringLiteral('a "bc"'),
      Ast.stringLiteral('I can\'t believe it')
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
