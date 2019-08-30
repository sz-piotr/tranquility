import { Location } from '../location'

export interface Span {
  start: Location,
  end: Location
}

export const SPAN_ZERO: Span = {
  start: { position: 0, line: 0, column: 0 },
  end: { position: 0, line: 0, column: 0 }
}
