import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

export function basicMath () {
  it('basicMath', () => {
    const result = parse(`
      let name = (4 + 5) / 3 - 7 * (((8)) * (2 / 3))
    `)

    const expected = Ast.program([
      Ast.variableDeclaration(
        Ast.identifier('name'),
        Ast.binaryOperation(
          Ast.BinaryOperator.SUBTRACT,
          Ast.binaryOperation(
            Ast.BinaryOperator.DIVIDE,
            Ast.binaryOperation(
              Ast.BinaryOperator.ADD,
              Ast.numberLiteral('4'),
              Ast.numberLiteral('5')
            ),
            Ast.numberLiteral('3')
          ),
          Ast.binaryOperation(
            Ast.BinaryOperator.MULTIPLY,
            Ast.numberLiteral('7'),
            Ast.binaryOperation(
              Ast.BinaryOperator.MULTIPLY,
              Ast.numberLiteral('8'),
              Ast.binaryOperation(
                Ast.BinaryOperator.DIVIDE,
                Ast.numberLiteral('2'),
                Ast.numberLiteral('3')
              )
            )
          )
        )
      )
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}