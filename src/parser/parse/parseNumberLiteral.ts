import { ParserContext } from './ParserContext'
import * as Ast from '../ast'

export function parseNumberLiteral (ctx: ParserContext) {
  const { start, end, value } = ctx.next()
  return Ast.numberLiteral(value, { start, end })
}
