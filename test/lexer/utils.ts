import { Token, TokenType, location } from '../../src/scanner/tokens'

type LocationArray = [number, number, number]

export function token (
  type: TokenType,
  value: string,
  start: LocationArray | number = 0,
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

export function resetLocation (token: Token): Token {
  return {
    ...token,
    start: location(0, 0, 0),
    end: location(token.value.length, 0, token.value.length)
  }
}
