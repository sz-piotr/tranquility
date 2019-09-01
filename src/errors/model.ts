import { Span } from '../parser/location'

export class Error {
  constructor (
    public message: string,
    public span: Span
  ) {}
}

export function error1 <T> (createMessage: (arg: T) => string) {
  return function (arg: T, span: Span) {
    const message = createMessage(arg)
    return new Error(message, { start: span.start, end: span.end })
  }
}
