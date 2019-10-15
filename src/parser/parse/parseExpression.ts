import { ParserContext } from './ParserContext'
import { parseAddSub } from './parseAddSub'
import { Expression } from '../ast'

export function parseExpression (ctx: ParserContext): Expression {
  return parseAddSub(ctx)
}
