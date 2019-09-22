import { CompilationError } from './CompilationError'

export function report (err: CompilationError, source: string) {
  const { start, end } = err.span

  const at = `${start.line + 1}:${start.column + 1}`

  const lineNumber = (start.line + 1).toString().padStart(4, ' ') + '| '
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
