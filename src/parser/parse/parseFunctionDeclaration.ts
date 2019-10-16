import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseIdentifier } from './literals/parseIdentifier'
import { parseFunctionParameters } from './parseFunctionParameters'
import { parseBlock } from './parseBlock'
import { FunctionDeclaration } from '../ast'

export function parseFunctionDeclaration (ctx: ParserContext) {
  const { start } = ctx.expect(TokenKind.FUNCTION)
  const identifier = parseIdentifier(ctx)

  ctx.expect(TokenKind.PAREN_OPEN)
  const parameters = parseFunctionParameters(ctx)
  ctx.expect(TokenKind.PAREN_CLOSE)

  const { statements, span: { end } } = parseBlock(ctx)

  return new FunctionDeclaration(
    identifier,
    parameters,
    statements,
    { start, end }
  )
}
