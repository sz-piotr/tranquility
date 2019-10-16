import { ProgramValue } from '../model'

export class Environment {
  private values = new Map<string, ProgramValue>()

  define (name: string, value: ProgramValue) {
    this.values.set(name, value)
  }

  assign (name: string, value: ProgramValue) {
    if (this.values.has(name)) {
      return this.values.set(name, value)
    } else {
      throw new TypeError(`Variable ${name} is not defined`)
    }
  }

  get (name: string) {
    if (this.values.has(name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.values.get(name)!
    } else {
      throw new TypeError(`Variable ${name} is not defined`)
    }
  }
}
