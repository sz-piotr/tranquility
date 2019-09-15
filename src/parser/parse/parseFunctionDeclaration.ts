import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import * as Ast from '../ast'
import { parseIdentifier } from './parseIdentifier'
import { parseFunctionParameters } from './parseFunctionParameters'
import { parseBlock } from './parseBlock'

export function parseFunctionDeclaration (ctx: ParserContext) {
  const { start } = ctx.expect(TokenKind.FUNCTION)
  const identifier = parseIdentifier(ctx)

  ctx.expect(TokenKind.PAREN_OPEN)
  const parameters = parseFunctionParameters(ctx)
  ctx.expect(TokenKind.PAREN_CLOSE)

  const { statements, span: { end } } = parseBlock(ctx)

  return new Ast.FunctionDeclaration(
    identifier,
    parameters,
    statements,
    { start, end }
  )
}
