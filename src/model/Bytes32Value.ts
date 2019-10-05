const RE_BYTES_32 = /^[\da-f]{64}$/i
const MASK_16BIT = 0xffff

export class Bytes32Value {
  constructor (private data: readonly number[]) {
    if (data.length !== 16 || data.some(x => (x & MASK_16BIT) !== x)) {
      throw new TypeError('Bytes32Value requires 16 16-bit numbers')
    }
  }

  static fromString (value: string) {
    if (!RE_BYTES_32.test(value)) {
      throw new TypeError('fromHexString requires a 32 byte hex string')
    }
    const bytes = value.match(/../g)!.map(x => parseInt(x, 16))
    const data = new Array(16).fill(0)
    for (let dataIndex = 0; dataIndex < 16; dataIndex++) {
      for (let byteIndex = 0; byteIndex < 2; byteIndex++) {
        const byte = bytes[dataIndex * 2 + byteIndex]
        data[dataIndex] = (data[dataIndex] << 8) | byte
      }
    }
    return new Bytes32Value(data)
  }

  toString () {
    return this.data
      .flatMap(twoBytes => {
        let value = twoBytes
        const arr = []
        for (let i = 0; i < 4; i++) {
          const hexDigit = (value & 0xF).toString(16)
          arr.push(hexDigit)
          value = value >> 4 // move to next hex digit
        }
        return arr.reverse()
      })
      .join('')
  }

  equals (other: Bytes32Value) {
    return this.data.every((x, i) => other.data[i] === x)
  }

  and (other: Bytes32Value) {
    return new Bytes32Value(this.data.map(
      (x, i) => x & other.data[i]
    ))
  }

  or (other: Bytes32Value) {
    return new Bytes32Value(this.data.map(
      (x, i) => x | other.data[i]
    ))
  }

  xor (other: Bytes32Value) {
    return new Bytes32Value(this.data.map(
      (x, i) => x ^ other.data[i]
    ))
  }

  not () {
    return new Bytes32Value(this.data.map(
      x => ~x & MASK_16BIT
    ))
  }

  addUnsigned (other: Bytes32Value) {
    let carry = 0
    let result = new Array(16).fill(0)
    for (let i = 15; i >= 0; i--) {
      const sum = this.data[i] + other.data[i] + carry
      result[i] = sum & MASK_16BIT
      carry = sum >>> 16
    }
    if (carry !== 0) {
      throw new Error('Overflow')
    }
    return new Bytes32Value(result)
  }
}
