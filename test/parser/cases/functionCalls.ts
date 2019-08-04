import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { stripRanges } from '../stripRanges'

export function functionCalls() {
  it('functionCalls', () => {
    const result = parse(`
      foo()

      foo(1, bar, a + b())
      (x() + (a + b)())()

      foo(
        yes()(),        no


      )(
        1

      )
    `)

    const expected = Ast.program([
      Ast.functionCall(
        Ast.identifier('foo'),
        []
      ),
      Ast.functionCall(
        Ast.identifier('foo'),
        [
          Ast.numberLiteral('1'),
          Ast.identifier('bar'),
          Ast.binaryOperation(
            '+',
            Ast.identifier('a'),
            Ast.functionCall(
              Ast.identifier('b'),
              []
            )
          )
        ]
      ),
      Ast.functionCall(
        Ast.binaryOperation(
          '+',
          Ast.functionCall(
            Ast.identifier('x'),
            []
          ),
          Ast.functionCall(
            Ast.binaryOperation(
              '+',
              Ast.identifier('a'),
              Ast.identifier('b')
            ),
            []
          )
        ),
        []
      ),
      Ast.functionCall(
        Ast.functionCall(
          Ast.identifier('foo'),
          [
            Ast.functionCall(
              Ast.functionCall(
                Ast.identifier('yes'),
                []
              ),
              []
            ),
            Ast.identifier('no')
          ]
        ),
        [
          Ast.numberLiteral('1')
        ]
      )
    ])

    expect(stripRanges(result)).to.deep.equal(expected)
  })
}
