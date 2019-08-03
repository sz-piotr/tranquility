import { expect } from 'chai'
import { parse } from '../src/parse'

describe('parse', () => {
  it('correctly parses variable declaration', () => {
    const ast = parse(`
      let name = 1
    `)
    expect(ast).to.deep.equal(undefined)
  })
})
