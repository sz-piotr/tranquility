export class InputStream {
  public location = 0
  public constructor (private source: string) {
  }

  public peek(): string {
    return this.source[this.location] || ''
  }

  public next(): string {
    return this.source[this.location++] || ''
  }
}
