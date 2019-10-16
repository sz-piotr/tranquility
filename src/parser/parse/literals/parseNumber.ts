import { ParserContext } from '../ParserContext'
import { NumberLiteral } from '../../ast'

export function parseNumber (ctx: ParserContext) {
  const { start, end, value } = ctx.next()
  return new NumberLiteral(value, { start, end })
}
