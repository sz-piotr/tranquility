import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseAccess } from './parseAccess'
import { UnaryOperation } from '../ast'
import { getUnaryOperator } from './getOperator'

export function parseUnaryOperation (ctx: ParserContext) {
  if (ctx.atAnyOf(TokenKind.PLUS, TokenKind.MINUS, TokenKind.BANG)) {
    const { start, kind } = ctx.next()
    const expression = parseAccess(ctx)
    const { end } = expression.span
    return new UnaryOperation(getUnaryOperator(kind), expression, { start, end })
  }
  return parseAccess(ctx)
}
