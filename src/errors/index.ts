import { error1 } from './model'
export * from './model'
export * from './report'

export const InvalidCharacter = error1(
  (char: string) => `Invalid character ${JSON.stringify(char)}`
)
export const UnexpectedToken = error1(
  (value: string) => `Unexpected token ${JSON.stringify(value)}`
)
