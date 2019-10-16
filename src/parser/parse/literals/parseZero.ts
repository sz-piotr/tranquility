import { ParserContext } from '../ParserContext'
import { ZeroLiteral } from '../../ast'

export function parseZero (ctx: ParserContext) {
  const { start, end } = ctx.next()
  return new ZeroLiteral({ start, end })
}
