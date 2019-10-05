const RE_BYTES_32 = /^[\da-f]{64}$/i

export class Bytes32Value {
  constructor (private data: readonly number[]) {
    if (data.length !== 8 || data.some(x => (x | 0) !== x)) {
      throw new TypeError('Bytes32Value requires 8 32-bit integers')
    }
  }

  static fromString (value: string) {
    if (!RE_BYTES_32.test(value)) {
      throw new TypeError('fromHexString requires a 32 byte hex string')
    }
    const bytes = value.match(/../g)!.map(x => parseInt(x, 16))
    const data = [0, 0, 0, 0, 0, 0, 0, 0]
    for (let dataIndex = 0; dataIndex < 8; dataIndex++) {
      for (let byteIndex = 0; byteIndex < 4; byteIndex++) {
        const byte = bytes[dataIndex * 4 + byteIndex]
        data[dataIndex] = (data[dataIndex] << 8) | byte
      }
    }
    return new Bytes32Value(data)
  }

  toString () {
    return this.data
      .flatMap(fourBytes => {
        let value = fourBytes
        const arr = []
        for (let i = 0; i < 8; i++) {
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
    return new Bytes32Value(this.data.map(x => ~x))
  }
}
