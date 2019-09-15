import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

export function emptyProgram () {
  it('emptyProgram', () => {
    const result = parse(`

    `)

    const expected = new Ast.Program([])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}
