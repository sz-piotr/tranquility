import { ParserContext } from './ParserContext'
import * as Ast from '../ast'

export function parseNumber (ctx: ParserContext) {
  const { start, end, value } = ctx.next()
  return Ast.numberLiteral(value, { start, end })
}
