import { ParserContext } from './ParserContext'
import { Expression } from '../ast'
import { parseComparison } from './parseComparison'

export function parseExpression (ctx: ParserContext): Expression {
  return parseComparison(ctx)
}
