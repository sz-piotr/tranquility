import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

export function basicMath () {
  it('basicMath', () => {
    const result = parse(`
      let name = (4 + 5) / 3 - 7 * (((8)) * (2 / 3))
    `)

    const expected = new Ast.Program([
      new Ast.VariableDeclaration(
        new Ast.Identifier('name'),
        new Ast.BinaryOperation(
          Ast.BinaryOperator.SUBTRACT,
          new Ast.BinaryOperation(
            Ast.BinaryOperator.DIVIDE,
            new Ast.BinaryOperation(
              Ast.BinaryOperator.ADD,
              new Ast.NumberLiteral('4'),
              new Ast.NumberLiteral('5')
            ),
            new Ast.NumberLiteral('3')
          ),
          new Ast.BinaryOperation(
            Ast.BinaryOperator.MULTIPLY,
            new Ast.NumberLiteral('7'),
            new Ast.BinaryOperation(
              Ast.BinaryOperator.MULTIPLY,
              new Ast.NumberLiteral('8'),
              new Ast.BinaryOperation(
                Ast.BinaryOperator.DIVIDE,
                new Ast.NumberLiteral('2'),
                new Ast.NumberLiteral('3')
              )
            )
          )
        )
      )
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}
