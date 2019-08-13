import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

export function assignment () {
  it('assignment', () => {
    const result = parse(`
      let a = 3
      a = 5 + 7
    `)

    const expected = Ast.program([
      Ast.variableDeclaration(
        Ast.identifier('a'),
        Ast.numberLiteral('3')
      ),
      Ast.variableAssignment(
        Ast.identifier('a'),
        Ast.binaryOperation(
          '+',
          Ast.numberLiteral('5'),
          Ast.numberLiteral('7')
        )
      )
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}
