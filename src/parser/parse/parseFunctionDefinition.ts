import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import * as Ast from '../ast'
import { parseFunctionParameters } from './parseFunctionParameters'
import { parseFunctionBody } from './parseFunctionBody'
import { parseIdentifier } from './parseIdentifier'

export function parseFunctionDefinition (ctx: ParserContext) {
  const { start } = ctx.expect(TokenKind.FUNCTION)
  const identifier = parseIdentifier(ctx)

  ctx.expect(TokenKind.PAREN_OPEN)
  const parameters = parseFunctionParameters(ctx)
  ctx.expect(TokenKind.PAREN_CLOSE)

  ctx.expect(TokenKind.CURLY_OPEN)
  const body = parseFunctionBody(ctx)
  const { end } = ctx.expect(TokenKind.CURLY_CLOSE)

  return Ast.functionDeclaration(identifier, parameters, body, { start, end })
}
