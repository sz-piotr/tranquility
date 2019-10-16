import { ProgramValue } from './ProgramValue'

export class BooleanValue implements ProgramValue {
  // TODO: proper tests and implementation

  constructor (private value: boolean) {}

  and (other: BooleanValue) {
    return new BooleanValue(this.value && other.value)
  }

  or (other: BooleanValue) {
    return new BooleanValue(this.value || other.value)
  }

  toPrint () {
    return this.value.toString()
  }
}
