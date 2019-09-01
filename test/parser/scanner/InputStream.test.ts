import { expect } from 'chai'
import { InputStream } from '../../../src/parser/scanner/InputStream'
import { location } from '../../../src/parser/location'

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

  it('handles uniform LF newlines', () => {
    const stream = new InputStream(
      '\n\n\n'
    )

    expect(stream.location).to.deep.equal(location(0, 0, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 1, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(2, 2, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(3, 3, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(3, 3, 0))
  })

  it('handles uniform CRLF newlines', () => {
    const stream = new InputStream(
      '\r\n\r\n\r\n'
    )

    expect(stream.location).to.deep.equal(location(0, 0, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 0, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(2, 1, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(3, 1, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(4, 2, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(5, 2, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(6, 3, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(6, 3, 0))
  })

  it('handles mixed newlines', () => {
    const stream = new InputStream(
      '\n\r' + '\r' + '\r\n' + '\n'
    )

    expect(stream.location).to.deep.equal(location(0, 0, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(1, 0, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(2, 1, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(3, 2, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(4, 2, 1))
    stream.next()
    expect(stream.location).to.deep.equal(location(5, 3, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(6, 4, 0))
    stream.next()
    expect(stream.location).to.deep.equal(location(6, 4, 0))
  })
})
