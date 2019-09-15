import { error0, error1 } from './model'
export * from './model'
export * from './report'

export const InvalidCharacter = error1(
  (char: string) => `Invalid character ${JSON.stringify(char)}`
)

export const InvalidStringCharacter = error1(
  (char: string) =>
    `Invalid character inside string ${JSON.stringify(char)}. ` +
    'Only ascii characters and escapes are supported.'
)

export const InvalidStringEscape = error1(
  (escape: string) => `Invalid escape inside string ${escape}.`
)

export const UnterminatedString = error0('Unterminated string literal.')

export const UnexpectedToken = error1(
  (value: string) => `Unexpected token ${JSON.stringify(value)}`
)
