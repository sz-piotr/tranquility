import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { stripRanges } from '../stripRanges'

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

    const expected = Ast.program([
      Ast.functionDefinition(
        Ast.identifier('main'),
        [],
        [
          Ast.variableDeclaration(
            Ast.identifier('a'),
            Ast.numberLiteral('1')
          ),
          Ast.variableDeclaration(
            Ast.identifier('b'),
            Ast.numberLiteral('2')
          ),
          Ast.functionCall(
            Ast.identifier('add'),
            [
              Ast.identifier('a'),
              Ast.identifier('b')
            ]
          )
        ]
      ),
      Ast.functionDefinition(
        Ast.identifier('add'),
        [
          Ast.identifier('a'),
          Ast.identifier('b')
        ],
        [
          Ast.binaryOperation(
            '+',
            Ast.identifier('a'),
            Ast.identifier('b')
          )
        ]
      )
    ])

    expect(stripRanges(result)).to.deep.equal(expected)
  })
}
