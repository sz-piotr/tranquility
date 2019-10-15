import { ParserContext } from './ParserContext'
import { Expression } from '../ast'
import { parseLogicalOr } from './parseLogicalOr'

export function parseExpression (ctx: ParserContext): Expression {
  return parseLogicalOr(ctx)
}
