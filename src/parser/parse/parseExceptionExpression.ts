import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseLogicalOr } from './parseLogicalOr'
import { ExceptionExpression } from '../ast'

export function parseExceptionExpression (ctx: ParserContext) {
  let expression = parseLogicalOr(ctx)

  if (ctx.at(TokenKind.OR)) {
    ctx.next()
    const exception = parseLogicalOr(ctx)
    expression = new ExceptionExpression(expression, exception, {
      start: expression.span.start,
      end: exception.span.end,
    })
  }

  return expression
}
