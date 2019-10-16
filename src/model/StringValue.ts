import { ProgramValue } from './ProgramValue'

export class StringValue implements ProgramValue {
  // TODO: proper tests and implementation

  constructor (private value: string) {}

  toPrint () {
    return JSON.stringify(this.value)
  }
}
