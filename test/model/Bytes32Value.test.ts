import { expect } from 'chai'
import { Bytes32Value } from '../../src/model/Bytes32Value'

const ALL_ZEROS = '0'.repeat(64)
const ALL_ONES = 'f'.repeat(64)
const DEADBEEF_START = 'deadb33f'.padEnd(64, '0')
const DEADBEEF_END = 'deadb33f'.padStart(64, '0')
const DEADBEEF_TWICE = 'deadb33f' + '0'.repeat(48) + 'deadb33f'

describe('Bytes32Value', () => {
  describe('constructor', () => {
    const cases = [
      ALL_ZEROS,
      ALL_ONES,
      DEADBEEF_TWICE,
      '123'.padStart(64, '0'),
      '1234567890ABCDEF'.padStart(64, '0'),
      '1234567890abcdef'.padStart(64, '0'),
      '00FFFF00'.repeat(8),
      'FF0000FF'.repeat(8),
    ]
    for (const input of cases) {
      it(`can be constructed from ${input}`, () => {
        const value = Bytes32Value.fromString(input)
        expect(value.toString()).to.equal(input.toLowerCase())
      })
    }
  })

  describe('equals', () => {
    it('equals returns true for the same values', () => {
      const first = Bytes32Value.fromString('123'.padStart(64, '0'))
      const second = Bytes32Value.fromString('123'.padStart(64, '0'))
      expect(first.equals(second)).to.equal(true)
    })

    it('equals returns false for different values', () => {
      const first = Bytes32Value.fromString('123'.padStart(64, '0'))
      const second = Bytes32Value.fromString('d3ad833F'.padStart(64, '0'))
      expect(first.equals(second)).to.equal(false)
    })
  })

  describe('binary and', () => {
    const cases = [
      ['0 AND 0 = 0', ALL_ZEROS, ALL_ZEROS, ALL_ZEROS],
      ['0 AND 1 = 0', ALL_ZEROS, ALL_ONES, ALL_ZEROS],
      ['1 AND 1 = 1', ALL_ONES, ALL_ONES, ALL_ONES],
      ['10 AND 00 = 00', DEADBEEF_START, ALL_ZEROS, ALL_ZEROS],
      ['10 AND 11 = 10', DEADBEEF_START, ALL_ONES, DEADBEEF_START],
      ['10 AND 01 = 00', DEADBEEF_START, DEADBEEF_END, ALL_ZEROS],
    ]
    for (const [name, a, b, expected] of cases) {
      it(name, () => {
        const aValue = Bytes32Value.fromString(a)
        const bValue = Bytes32Value.fromString(b)

        const result = aValue.and(bValue)

        expect(result.toString()).to.equal(expected)
      })
    }
  })

  describe('binary or', () => {
    const cases = [
      ['0 OR 0 = 0', ALL_ZEROS, ALL_ZEROS, ALL_ZEROS],
      ['0 OR 1 = 1', ALL_ZEROS, ALL_ONES, ALL_ONES],
      ['1 OR 1 = 1', ALL_ONES, ALL_ONES, ALL_ONES],
      ['10 OR 00 = 10', DEADBEEF_START, ALL_ZEROS, DEADBEEF_START],
      ['10 OR 11 = 11', DEADBEEF_START, ALL_ONES, ALL_ONES],
      ['100 AND 001 = 101', DEADBEEF_START, DEADBEEF_END, DEADBEEF_TWICE],
    ]
    for (const [name, a, b, expected] of cases) {
      it(name, () => {
        const aValue = Bytes32Value.fromString(a)
        const bValue = Bytes32Value.fromString(b)

        const result = aValue.or(bValue)

        expect(result.toString()).to.equal(expected)
      })
    }
  })

  describe('binary xor', () => {
    const cases = [
      ['0 OR 0 = 0', ALL_ZEROS, ALL_ZEROS, ALL_ZEROS],
      ['0 OR 1 = 1', ALL_ZEROS, ALL_ONES, ALL_ONES],
      ['1 OR 1 = 1', ALL_ONES, ALL_ONES, ALL_ZEROS],
      ['10 OR 00 = 10', DEADBEEF_START, ALL_ZEROS, DEADBEEF_START],
      ['10 OR 11 = 01', DEADBEEF_START, ALL_ONES, '21524cc0'.padEnd(64, 'f')],
      ['100 AND 001 = 101', DEADBEEF_START, DEADBEEF_END, DEADBEEF_TWICE],
    ]
    for (const [name, a, b, expected] of cases) {
      it(name, () => {
        const aValue = Bytes32Value.fromString(a)
        const bValue = Bytes32Value.fromString(b)

        const result = aValue.xor(bValue)

        expect(result.toString()).to.equal(expected)
      })
    }
  })

  describe('binary not', () => {
    it('inverts bytes', () => {
      const value = '1234567890abcdef' + '0'.repeat(32) + 'fedcba0987654321'
      const expected = 'edcba9876f543210' + 'f'.repeat(32) + '012345f6789abcde'

      const result = Bytes32Value.fromString(value).not()

      expect(result.toString()).to.equal(expected)
    })
  })
})
