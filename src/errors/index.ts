import { Span } from '../parser/ast'

export class Error {
  constructor (
    public message: string,
    public span: Span
  ) {}
}

export function report (err: Error, source: string) {
  const { start, end } = err.span

  const at = `${start.line}:${start.column}`

  const lineNumber = start.line.toString().padStart(4, ' ') + '| '
  const lineStart = start.position - start.column
  const lineEnd = findLineEnd(source, lineStart)
  const line = lineNumber + source.substring(lineStart, lineEnd)

  const squiggles = '^'.repeat(end.column - start.column)
  const spaces = ' '.repeat(lineNumber.length + start.column)
  const underline = spaces + squiggles

  return `Error: ${err.message} at ${at}\n${line}\n${underline}`
}

function findLineEnd (input: string, from: number) {
  for (let i = from; i < input.length; i++) {
    if (input[i] === '\n' || input[i] === '\r') {
      return i
    }
  }
  return input.length
}

function error1 <T> (createMessage: (arg: T) => string) {
  return function (arg: T, span: Span) {
    const message = createMessage(arg)
    return new Error(message, { start: span.start, end: span.end })
  }
}

export const InvalidCharacter = error1(
  (char: string) => `Invalid character ${JSON.stringify(char)}`
)
export const UnexpectedToken = error1(
  (value: string) => `Unexpected token ${JSON.stringify(value)}`
)
