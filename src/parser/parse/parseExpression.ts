import { ParserContext } from './ParserContext'
import { Expression } from '../ast'
import { parseExceptionExpression } from './parseExceptionExpression'

export function parseExpression (ctx: ParserContext): Expression {
  return parseExceptionExpression(ctx)
}
