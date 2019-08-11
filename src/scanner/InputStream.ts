import { Location } from './tokens'

export class InputStream {
  public location: Location = {
    position: 0,
    line: 0,
    column: 0
  }

  private hadCR = false
  private hadLF = false

  public constructor (private source: string) {
  }

  public peek(): string | undefined {
    return this.source[this.location.position]
  }

  public next(): string | undefined {
    const char = this.peek()
    this.location = this.nextLocation()
    return char
  }

  private nextLocation () {
    const char = this.peek()

    if (char === undefined) {
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

    return {
      position: this.location.position + 1,
      line: this.location.line,
      column: this.location.column + 1
    }
  }

  private nextLine () {
    return {
      position: this.location.position + 1,
      line: this.location.line + 1,
      column: 0
    }
  }
}
