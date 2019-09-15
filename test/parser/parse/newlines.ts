import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import { location } from '../../../src/parser/location'
import * as Ast from '../../../src/parser/ast'

export function newlines () {
  it('newlines', () => {
    const source =
      'lineOne // comment\n' +
      'lineTwo /*\n' +
      '*/ lineThree(\n' +
      '\n' +
      ')'
    const result = parse(source)

    const expected = new Ast.Program([
      new Ast.Identifier('lineOne', {
        start: location(0, 0, 0),
        end: location(7, 0, 7)
      }),
      new Ast.Identifier('lineTwo', {
        start: location(19, 1, 0),
        end: location(26, 1, 7)
      }),
      new Ast.FunctionCall(
        new Ast.Identifier('lineThree', {
          start: location(33, 2, 3),
          end: location(42, 2, 12)
        }),
        [],
        {
          start: location(33, 2, 3),
          end: location(46, 4, 1)
        }
      )
    ], {
      start: location(0, 0, 0),
      end: location(source.length, 4, 1)
    })

    expect(result.ast).to.deep.equal(expected)
  })
}
