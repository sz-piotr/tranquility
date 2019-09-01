import { isIdentifierChar } from './utils'
import { readWhile } from './readWhile'
import { ScannerContext } from './ScannerContext'
import { TokenKind } from '../tokens'

export function readIdentifier (ctx: ScannerContext) {
  const value = readWhile(ctx, isIdentifierChar)
  return ctx.token(getIdentifierType(value), value)
}

function getIdentifierType (identifier: string) {
  switch (identifier) {
    case 'function': return TokenKind.FUNCTION
    case 'event': return TokenKind.EVENT
    case 'storage': return TokenKind.STORAGE
    case 'contract': return TokenKind.CONTRACT
    case 'let': return TokenKind.LET
    case 'use': return TokenKind.USE
    case 'for': return TokenKind.FOR
    case 'while': return TokenKind.WHILE
    case 'if': return TokenKind.IF
    case 'else': return TokenKind.ELSE
    case 'zero': return TokenKind.ZERO
    case 'return': return TokenKind.RETURN
    case 'true': return TokenKind.BOOLEAN
    case 'false': return TokenKind.BOOLEAN
    default: return TokenKind.IDENTIFIER
  }
}
