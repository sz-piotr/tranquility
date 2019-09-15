import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { parseStatement } from './parseStatement'

export function parseFunctionBody (ctx: ParserContext) {
  const body: Ast.Statement[] = []
  while (!ctx.at(TokenKind.CURLY_CLOSE)) {
    body.push(parseStatement(ctx))
  }
  return body
}
