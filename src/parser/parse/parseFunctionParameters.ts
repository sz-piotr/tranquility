import { ParserContext } from './ParserContext'
import { Identifier } from '../ast'
import { TokenKind } from '../tokens'
import { parseIdentifier } from './literals/parseIdentifier'

export function parseFunctionParameters (ctx: ParserContext) {
  const parameters: Identifier[] = []
  while (ctx.at(TokenKind.IDENTIFIER)) {
    parameters.push(parseIdentifier(ctx))
    if (!ctx.at(TokenKind.COMMA)) {
      break
    }
    ctx.expect(TokenKind.COMMA)
  }
  return parameters
}
