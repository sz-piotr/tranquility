import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import * as Ast from '../ast'
import { parseExpression } from './expressions/parseExpression'
import { parseIdentifier } from './literals/parseIdentifier'

export function parseVariableDeclaration (ctx: ParserContext) {
  const { start } = ctx.expect(TokenKind.LET)
  const identifier = parseIdentifier(ctx)
  ctx.expect(TokenKind.EQUALS)
  const value = parseExpression(ctx)
  return new Ast.VariableDeclaration(identifier, value, { start, end: value.span.end })
}
