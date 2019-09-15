import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import { TokenKind } from '../tokens'
import { getOperation } from './getOperation'
import { parseCallOrFactor } from './parseCallOrFactor'

export function parseTerm (ctx: ParserContext) {
  const { start } = ctx.peek()
  let result: Ast.Expression = parseCallOrFactor(ctx)
  while (ctx.at(TokenKind.STAR) || ctx.at(TokenKind.SLASH)) {
    const { kind } = ctx.next()
    const right = parseCallOrFactor(ctx)
    result = Ast.binaryOperation(
      getOperation(kind),
      result,
      right,
      { start, end: ctx.peek().end }
    )
  }
  return result
}
