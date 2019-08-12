import { Location, location } from './location'

export class InputStream {
  public location: Location = {
    position: 0,
    line: 0,
    column: 0
  }

  private hadCR: boolean
  private hadLF: boolean

  public constructor (private source: string) {
    this.hadCR = source[0] === '\r'
    this.hadLF = source[0] === '\n'
  }

  public peek (): string | undefined {
    return this.source[this.location.position]
  }

  public next (): string | undefined {
    const char = this.peek()
    this.location = this.nextLocation()
    return char
  }

  private nextLocation () {
    const char = this.source[this.location.position + 1]

    if (this.peek() === undefined) {
      return this.location
    }

    if (char === '\r') {
      if (this.hadCR) {
        this.hadLF = false
        return this.nextLine()
      } else {
        this.hadCR = true
      }
    } else if (char === '\n') {
      if (this.hadLF) {
        this.hadCR = false
        return this.nextLine()
      } else {
        this.hadLF = true
      }
    } else if (this.hadCR || this.hadLF) {
      this.hadCR = false
      this.hadLF = false
      return this.nextLine()
    }

    return location(
      this.location.position + 1,
      this.location.line,
      this.location.column + 1
    )
  }

  private nextLine () {
    return location(this.location.position + 1, this.location.line + 1, 0)
  }
}
