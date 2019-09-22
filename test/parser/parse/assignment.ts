import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function assignment () {
  it('assignment', () => {
    const result = parse(`
      let a = 3
      a = 5 + 7
    `)

    const expected = new Ast.Program([
      new Ast.VariableDeclaration(
        new Ast.Identifier('a'),
        new Ast.NumberLiteral('3')
      ),
      new Ast.VariableAssignment(
        Ast.AssignmentOperator.EQUALS,
        new Ast.Identifier('a'),
        new Ast.BinaryOperation(
          Ast.BinaryOperator.ADD,
          new Ast.NumberLiteral('5'),
          new Ast.NumberLiteral('7')
        )
      )
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
