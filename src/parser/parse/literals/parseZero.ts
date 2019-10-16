import { ParserContext } from '../ParserContext'
import * as Ast from '../../ast'

export function parseZero (ctx: ParserContext) {
  const { start, end } = ctx.next()
  return new Ast.ZeroLiteral({ start, end })
}
