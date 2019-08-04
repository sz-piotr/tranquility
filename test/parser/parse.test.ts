import { expect } from 'chai'
import { parse } from '../../src/parser/parse'
import * as Ast from '../../src/parser/ast'
import { stripRanges } from './stripRanges'

describe('parse', () => {
  it('correctly parses variable declaration', () => {
    const ast = stripRanges(parse(`
      let name = 1
    `))
    expect(ast).to.deep.equal(Ast.program([
      Ast.variableDeclaration(
        Ast.identifier('name'),
        Ast.numberLiteral('1')
      )
    ]))
  })

  it('correctly parses basic math', () => {
    const ast = stripRanges(parse(`
      name = (4 + 5) / 3 - 7 * 8
    `))
    expect(ast).to.deep.equal(Ast.program([
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
            Ast.numberLiteral('8')
          )
        )
      )
    ]))
  })
})
