import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseNumber } from './parseNumber'
import { parseBoolean } from './parseBoolean'
import { parseIdentifier } from './parseIdentifier'
import { parseZero } from './parseZero'
import { parseString } from './parseString'

export function parseLiteral (ctx: ParserContext) {
  if (ctx.at(TokenKind.NUMBER)) {
    return parseNumber(ctx)
  } else if (ctx.at(TokenKind.BOOLEAN)) {
    return parseBoolean(ctx)
  } else if (ctx.at(TokenKind.ZERO)) {
    return parseZero(ctx)
  } else if (ctx.at(TokenKind.IDENTIFIER)) {
    return parseIdentifier(ctx)
  } else if (ctx.at(TokenKind.SINGLE_QUOTE) || ctx.at(TokenKind.DOUBLE_QUOTE)) {
    return parseString(ctx)
  } else {
    return ctx.fail()
  }
}
