import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import { resetRanges } from '../../utils'

export function stringLiteral () {
  it('stringLiteral', () => {
    const result = parse(`
      ""
      "value"
      "a b c"
      "a \\"bc\\""
      "I can't believe it!"
    `)

    const expected = new Ast.Program([
      new Ast.StringLiteral(''),
      new Ast.StringLiteral('value'),
      new Ast.StringLiteral('a b c'),
      new Ast.StringLiteral('a "bc"'),
      new Ast.StringLiteral('I can\'t believe it!')
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
    expect(result.errors).to.deep.equal([])
  })
}
