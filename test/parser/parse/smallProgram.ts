import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function smallProgram () {
  it('smallProgram', () => {
    const result = parse(`
      function main () {
        let a = 1
        let b = 2
        add(a, b)
      }

      function add (a, b) {
        a + b
      }
    `)

    const expected = new Ast.Program([
      new Ast.FunctionDeclaration(
        new Ast.Identifier('main'),
        [],
        [
          new Ast.VariableDeclaration(
            new Ast.Identifier('a'),
            new Ast.NumberLiteral('1')
          ),
          new Ast.VariableDeclaration(
            new Ast.Identifier('b'),
            new Ast.NumberLiteral('2')
          ),
          new Ast.FunctionCall(
            new Ast.Identifier('add'),
            [
              new Ast.Identifier('a'),
              new Ast.Identifier('b')
            ]
          )
        ]
      ),
      new Ast.FunctionDeclaration(
        new Ast.Identifier('add'),
        [
          new Ast.Identifier('a'),
          new Ast.Identifier('b')
        ],
        [
          new Ast.BinaryOperation(
            Ast.BinaryOperator.ADD,
            new Ast.Identifier('a'),
            new Ast.Identifier('b')
          )
        ]
      )
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
