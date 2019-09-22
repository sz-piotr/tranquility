import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function functionCalls () {
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

    const expected = new Ast.Program([
      new Ast.FunctionCall(
        new Ast.Identifier('foo'),
        []
      ),
      new Ast.FunctionCall(
        new Ast.FunctionCall(
          new Ast.FunctionCall(
            new Ast.Identifier('foo'),
            [
              new Ast.NumberLiteral('1'),
              new Ast.Identifier('bar'),
              new Ast.BinaryOperation(
                Ast.BinaryOperator.ADD,
                new Ast.Identifier('a'),
                new Ast.FunctionCall(
                  new Ast.Identifier('b'),
                  []
                )
              )
            ]
          ),
          [
            new Ast.BinaryOperation(
              Ast.BinaryOperator.ADD,
              new Ast.FunctionCall(
                new Ast.Identifier('x'),
                []
              ),
              new Ast.FunctionCall(
                new Ast.BinaryOperation(
                  Ast.BinaryOperator.ADD,
                  new Ast.Identifier('a'),
                  new Ast.Identifier('b')
                ),
                []
              )
            )
          ]
        ),
        []
      ),
      new Ast.FunctionCall(
        new Ast.FunctionCall(
          new Ast.Identifier('foo'),
          [
            new Ast.FunctionCall(
              new Ast.FunctionCall(
                new Ast.Identifier('yes'),
                []
              ),
              []
            ),
            new Ast.Identifier('no')
          ]
        ),
        [
          new Ast.NumberLiteral('1')
        ]
      )
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
