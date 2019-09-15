import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { parseStatement } from './parseStatement'

export function parseBlock (ctx: ParserContext) {
  const statements: Ast.Statement[] = []
  const { start } = ctx.expect(TokenKind.CURLY_OPEN)
  while (!ctx.at(TokenKind.CURLY_CLOSE)) {
    statements.push(parseStatement(ctx))
  }
  const { end } = ctx.expect(TokenKind.CURLY_CLOSE)
  return new Ast.Block(statements, { start, end })
}
