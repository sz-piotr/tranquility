import { Token, TokenType, Location } from '../../src/scanner/tokens'

type LocationArray = [number, number, number]

export function token (
  type: TokenType,
  value: string,
  start: LocationArray | number,
  end?: LocationArray
): Token {
  const startValue = typeof start === 'number'
    ? location(start, 0, start)
    : location(...start)
  const endValue = end
    ? location(...end)
    : location(
      startValue.position + value.length,
      startValue.line,
      startValue.column + value.length
    )
  return {
    type,
    value,
    start: startValue,
    end: endValue
  }
}

export function location (position: number, line: number, column: number): Location {
  return { position, line, column }
}
