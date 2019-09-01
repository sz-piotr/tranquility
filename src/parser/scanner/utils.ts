const isRegex = (re: RegExp) =>
  (char?: string): char is string =>
    !!char && re.test(char)

export const isWhitespace = isRegex(/\s/)

export const isNumberChar = isRegex(/\d/)

export const isIdentifierChar = isRegex(/\w/)

export const isHexDigit = isRegex(/[\da-f]/i)

export function isValidStringContent (char: string, doubleQuote: boolean) {
  const code = char.charCodeAt(0)
  return (code >= 0x20 &&
    code <= 0x7E &&
    char !== '\\' &&
    (char !== '\'' || doubleQuote) &&
    (char !== '"' || !doubleQuote)
  )
}
