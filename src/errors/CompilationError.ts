import { SPAN_ZERO, Span } from '../parser/location'

export class CompilationError {
  span: Span
  constructor (
    public message: string,
    { start, end } = SPAN_ZERO
  ) {
    this.span = { start, end }
  }
}
