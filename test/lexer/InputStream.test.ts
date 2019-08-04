import 'mocha'
import { expect } from 'chai'

import { InputStream } from '../../src/scanner/InputStream'

describe('InputStream', () => {
  it('peek should return char and not modify location', () => {
    const stream = new InputStream('abc')

    expect(stream.peek()).to.equal('a')
    expect(stream.location).to.equal(0)
  })

  it('next should return char and increment location', () => {
    const stream = new InputStream('abc')

    expect(stream.next()).to.equal('a')
    expect(stream.location).to.equal(1)
  })

  it('peek should return the char at location', () => {
    const stream = new InputStream('abc')

    stream.next()

    expect(stream.location).to.equal(1)
    expect(stream.peek()).to.equal('b')
  })

  it('next should return the char at location', () => {
    const stream = new InputStream('abc')

    stream.next()

    expect(stream.location).to.equal(1)
    expect(stream.next()).to.equal('b')
  })

  it('calling peak or next at the end returns ""', () => {
    const stream = new InputStream('abc')

    stream.next()
    stream.next()
    stream.next()

    expect(stream.peek()).to.equal('')
    expect(stream.next()).to.equal('')
  })
})
