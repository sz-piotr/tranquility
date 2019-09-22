import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function variableDeclaration () {
  it('variableDeclaration', () => {
    const result = parse(`
      let name = 1
    `)

    const expected = new Ast.Program([
      new Ast.VariableDeclaration(
        new Ast.Identifier('name'),
        new Ast.NumberLiteral('1')
      )
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
