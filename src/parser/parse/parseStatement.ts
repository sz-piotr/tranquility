import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseVariableDeclaration } from './parseVariableDeclaration'
import { parseFunctionDeclaration } from './parseFunctionDeclaration'
import { parseAssignmentOrExpression } from './parseAssignmentOrExpression'

export function parseStatement (ctx: ParserContext) {
  if (ctx.at(TokenKind.LET)) {
    return parseVariableDeclaration(ctx)
  } else if (ctx.at(TokenKind.FUNCTION)) {
    return parseFunctionDeclaration(ctx)
  } else {
    return parseAssignmentOrExpression(ctx)
  }
}
