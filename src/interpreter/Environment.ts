/* eslint-disable @typescript-eslint/no-explicit-any */

export class Environment {
  private values = new Map<string, any>()

  define (name: string, value: any) {
    this.values.set(name, value)
  }

  assign (name: string, value: any) {
    if (this.values.has(name)) {
      return this.values.set(name, value)
    } else {
      throw new TypeError(`Variable ${name} is not defined`)
    }
  }

  get (name: string) {
    if (this.values.has(name)) {
      return this.values.get(name)
    } else {
      throw new TypeError(`Variable ${name} is not defined`)
    }
  }
}
