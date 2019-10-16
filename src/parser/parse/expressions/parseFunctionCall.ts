import { ParserContext } from '../ParserContext'
import { TokenKind } from '../../tokens'
import { Expression, FunctionCall } from '../../ast'
import { parseExpression } from './parseExpression'
import { Location } from '../../location'

export function parseFunctionCall (ctx: ParserContext, result: Expression, start: Location) {
  ctx.expect(TokenKind.PAREN_OPEN)
  const parameters: Expression[] = []

  while (!ctx.at(TokenKind.PAREN_CLOSE)) {
    parameters.push(parseExpression(ctx))
    if (!ctx.at(TokenKind.PAREN_CLOSE)) {
      ctx.expect(TokenKind.COMMA)
    }
  }

  const { end } = ctx.expect(TokenKind.PAREN_CLOSE)
  return new FunctionCall(result, parameters, { start, end })
}
