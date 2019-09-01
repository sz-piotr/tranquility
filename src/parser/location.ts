export interface Location {
  readonly position: number,
  readonly line: number,
  readonly column: number
}

export function location (position: number, line: number, column: number): Location {
  return { position, line, column }
}

export interface Span {
  start: Location,
  end: Location
}

export const SPAN_ZERO: Span = {
  start: { position: 0, line: 0, column: 0 },
  end: { position: 0, line: 0, column: 0 }
}
