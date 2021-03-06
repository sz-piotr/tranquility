import { expect } from 'chai'
import { CompilationError, report } from '../../src/errors'
import { location } from '../../src/parser/location'

describe('report', () => {
  it('reports errors from short, single lines', () => {
    const source =
      'bla bla bla\r\n' +
      '  foo(bar + 1)\n' +
      'bla bla bla'
    const error = new CompilationError('some message', '', {
      start: location(19, 1, 6),
      end: location(22, 1, 9)
    })
    expect(report(error, source)).to.equal(
      'Error at 2:7: some message\n' +
      '   2|   foo(bar + 1)\n' +
      '            ^^^'
    )
  })
})
