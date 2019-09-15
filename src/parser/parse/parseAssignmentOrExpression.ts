import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import * as Ast from '../ast'
import { parseExpression } from './parseExpression'

export function parseAssignmentOrExpression (ctx: ParserContext) {
  const left = parseExpression(ctx)
  if (ctx.at(TokenKind.EQUALS)) {
    ctx.next()
    const right = parseExpression(ctx)
    return Ast.variableAssignment(
      Ast.AssignmentOperator.EQUALS,
      left,
      right,
      { start: left.span.start, end: right.span.end }
    )
  }
  return left
}
