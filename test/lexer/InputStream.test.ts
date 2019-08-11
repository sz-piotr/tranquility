import 'mocha'
import { expect } from 'chai'

import { InputStream } from '../../src/scanner/InputStream'
import { location } from './utils'

describe('InputStream', () => {
  it('peek should return the char at location', () => {
    const stream = new InputStream('abc')

    stream.next()

    expect(stream.location).to.deep.equal(location(1, 0, 1))
    expect(stream.peek()).to.equals('b')
    expect(stream.location).to.deep.equal(location(1, 0, 1))
  })

  it('next should return the char at location', () => {
    const stream = new InputStream('abc')

    stream.next()

    expect(stream.location).to.deep.equal(location(1, 0, 1))
    expect(stream.next()).to.equals('b')
    expect(stream.location).to.deep.equal(location(2, 0, 2))
  })

  it('calling peak or next at the end returns ""', () => {
    const stream = new InputStream('abc')

    stream.next()
    stream.next()
    stream.next()

    expect(stream.peek()).to.equals(undefined)
    expect(stream.next()).to.equals(undefined)
  })

  it('calling next at the end does not change location', () => {
    const stream = new InputStream('a')

    expect(stream.location).to.deep.equal(location(0, 0, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 0, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 0, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 0, 1))
  })
})
