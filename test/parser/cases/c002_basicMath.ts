import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { stripRanges } from '../stripRanges'

export function basicMath () {
  it('c002 basicMath', () => {
    const result = parse(`
      name = (4 + 5) / 3 - 7 * (((8)) * (2 / 3))
    `)

    const expected = Ast.program([
      Ast.variableAssignment(
        Ast.identifier('name'),
        Ast.binaryOperation(
          '-',
          Ast.binaryOperation(
            '/',
            Ast.binaryOperation(
              '+',
              Ast.numberLiteral('4'),
              Ast.numberLiteral('5')
            ),
            Ast.numberLiteral('3')
          ),
          Ast.binaryOperation(
            '*',
            Ast.numberLiteral('7'),
            Ast.binaryOperation(
              '*',
              Ast.numberLiteral('8'),
              Ast.binaryOperation(
                '/',
                Ast.numberLiteral('2'),
                Ast.numberLiteral('3')
              )
            )
          )
        )
      )
    ])

    expect(stripRanges(result)).to.deep.equal(expected)
  })
}
