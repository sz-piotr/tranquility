import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { stripRanges } from '../stripRanges'

export function variableDeclaration () {
  it('c001 variableDeclaration', () => {
    const result = parse(`
      let name = 1
    `)

    const expected = Ast.program([
      Ast.variableDeclaration(
        Ast.identifier('name'),
        Ast.numberLiteral('1')
      )
    ])

    expect(stripRanges(result)).to.deep.equal(expected)
  })
}
