import { expect } from 'chai'
import { parse } from '../src/parse'
import * as Ast from '../src/ast'

describe('parse', () => {
  it('correctly parses variable declaration', () => {
    const ast = parse(`
      let name = 1
    `)
    expect(ast).to.deep.equal(
      Ast.variableDeclaration(
        Ast.identifier('name'),
        Ast.numberLiteral('1')
      )
    )
  })
})
