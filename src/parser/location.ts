export interface Location {
  readonly position: number,
  readonly line: number,
  readonly column: number
}

export function location (position: number, line: number, column: number): Location {
  return { position, line, column }
}
