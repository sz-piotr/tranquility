import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { parseIdentifier } from './parseIdentifier'

export function parseFunctionParameters (ctx: ParserContext) {
  const parameters: Ast.Identifier[] = []
  while (ctx.at(TokenKind.IDENTIFIER)) {
    parameters.push(parseIdentifier(ctx))
    if (!ctx.at(TokenKind.COMMA)) {
      break
    }
    ctx.expect(TokenKind.COMMA)
  }
  return parameters
}
