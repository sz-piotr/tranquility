import { ProgramValue } from './ProgramValue'

export class NumberValue implements ProgramValue {
  // TODO: proper tests and implementation

  private value: number
  constructor (value: number) {
    this.value = value | 0
  }

  add (other: NumberValue) {
    return new NumberValue(this.value + other.value)
  }

  sub (other: NumberValue) {
    return new NumberValue(this.value - other.value)
  }

  mul (other: NumberValue) {
    return new NumberValue(this.value * other.value)
  }

  div (other: NumberValue) {
    return new NumberValue(this.value / other.value)
  }

  rem (other: NumberValue) {
    return new NumberValue(this.value % other.value)
  }

  toPrint () {
    return this.value.toString()
  }
}
