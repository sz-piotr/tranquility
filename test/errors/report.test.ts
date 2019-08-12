import { expect } from 'chai'
import { Error, report } from '../../src/errors'
import { location } from '../../src/parser/location'

describe('report', () => {
  it('reports errors from short, single lines', () => {
    const source =
      'bla bla bla\r\n' +
      '  foo(bar + 1)\n' +
      'bla bla bla'
    const error = new Error('some message', {
      start: location(19, 1, 6),
      end: location(22, 1, 9)
    })
    expect(report(error, source)).to.equal(
      'Error: some message at 1:6\n' +
      '   1|   foo(bar + 1)\n' +
      '            ^^^'
    )
  })
})
