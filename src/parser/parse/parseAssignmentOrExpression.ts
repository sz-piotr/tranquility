import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseExpression } from './expressions/parseExpression'
import { VariableAssignment, AssignmentOperator } from '../ast'

export function parseAssignmentOrExpression (ctx: ParserContext) {
  const left = parseExpression(ctx)
  if (ctx.at(TokenKind.EQUALS)) {
    ctx.next()
    const right = parseExpression(ctx)
    return new VariableAssignment(
      AssignmentOperator.EQUALS,
      left,
      right,
      { start: left.span.start, end: right.span.end }
    )
  }
  return left
}
