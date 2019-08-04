import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { stripRanges } from '../stripRanges'

export function emptyProgram () {
  it('emptyProgram', () => {
    const result = parse(`

    `)

    const expected = Ast.program([])

    expect(stripRanges(result)).to.deep.equal(expected)
  })
}
