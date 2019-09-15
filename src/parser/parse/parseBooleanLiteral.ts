import { ParserContext } from './ParserContext'
import * as Ast from '../ast'

export function parseBooleanLiteral (ctx: ParserContext) {
  const { start, end, value } = ctx.next()
  return Ast.booleanLiteral(value === 'true', { start, end })
}
