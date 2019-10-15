import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseAccess } from './parseAccess'
import { UnaryOperation } from '../ast'
import { getUnaryOperator } from './getOperator'

export function parseUnaryOperation (ctx: ParserContext) {
  if (ctx.at(TokenKind.PLUS) || ctx.at(TokenKind.MINUS) || ctx.at(TokenKind.BANG)) {
    const { start, kind } = ctx.next()
    const expression = parseAccess(ctx)
    const { end } = expression.span
    return new UnaryOperation(getUnaryOperator(kind), expression, { start, end })
  }
  return parseAccess(ctx)
}
