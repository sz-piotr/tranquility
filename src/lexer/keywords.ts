export const keywords = [
  'let',
  'function',
  'return',
  'end',
  'if',
  'then',
  'else',
  'true',
  'false'
]

export function isKeyword(identifier: string) {
  return keywords.includes(identifier)
}

export const alphanumericOperators = [
  'and',
  'or',
  'not'
]

export function isAlphanumericOperator(identifier: string) {
  return alphanumericOperators.includes(identifier)
}
