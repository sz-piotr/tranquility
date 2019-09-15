import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseNumberLiteral } from './parseNumberLiteral'
import { parseBooleanLiteral } from './parseBooleanLiteral'
import { parseIdentifier } from './parseIdentifier'

export function parseLiteral (ctx: ParserContext) {
  if (ctx.at(TokenKind.NUMBER)) {
    return parseNumberLiteral(ctx)
  }

  if (ctx.at(TokenKind.BOOLEAN)) {
    return parseBooleanLiteral(ctx)
  }

  if (ctx.at(TokenKind.IDENTIFIER)) {
    return parseIdentifier(ctx)
  }

  return ctx.fail()
}
