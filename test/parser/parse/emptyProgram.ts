import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function emptyProgram () {
  it('emptyProgram', () => {
    const result = parse(`

    `)

    const expected = new Ast.Program([])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
