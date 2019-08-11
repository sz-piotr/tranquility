import { Token, TokenType, Location } from '../../src/scanner/tokens'

type LocationArray = [number, number, number]

export function token (type: TokenType, value: string, start: LocationArray, end: LocationArray): Token {
  return {
    type,
    value,
    start: location(...start),
    end: location(...end)
  }
}

export function location (position: number, line: number, column: number): Location {
  return { position, line, column }
}
