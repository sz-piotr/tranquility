import { ParserContext } from '../ParserContext'
import { BooleanLiteral } from '../../ast'

export function parseBoolean (ctx: ParserContext) {
  const { start, end, value } = ctx.next()
  return new BooleanLiteral(value === 'true', { start, end })
}
