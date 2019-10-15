import { ParserContext } from './ParserContext'
import { parseLiteralOrParenthesized } from './parseLiteralOrParenthesized'
import { TokenKind } from '../tokens'
import { Expression } from '../ast'
import { parseMemberAccess } from './parseMemberAccess'
import { parseIndexAccess } from './parseIndexAccess'
import { parseFunctionCall } from './parseFunctionCall'

export function parseAccess (ctx: ParserContext) {
  const { start } = ctx.peek()
  let result: Expression = parseLiteralOrParenthesized(ctx)

  while (true) {
    if (ctx.at(TokenKind.DOT)) {
      result = parseMemberAccess(ctx, result, start)
    } else if (ctx.at(TokenKind.BRACKET_OPEN)) {
      result = parseIndexAccess(ctx, result, start)
    } else if (ctx.at(TokenKind.PAREN_OPEN)) {
      result = parseFunctionCall(ctx, result, start)
    } else {
      break
    }
  }

  return result
}
