import { ParserContext } from './ParserContext'
import * as Ast from '../ast'
import * as Err from '../../errors'
import { TokenKind } from '../tokens'
import { parseStatement } from './parseStatement'

export function parseProgram (ctx: ParserContext): Ast.Program {
  const children = []
  const { start } = ctx.peek()

  while (!ctx.at(TokenKind.EOF)) {
    try {
      children.push(parseStatement(ctx))
    } catch (e) {
      handleError(ctx, e)
    }
  }
  ctx.expect(TokenKind.EOF)

  return new Ast.Program(children, { start, end: ctx.peek().end })
}

function handleError (ctx: ParserContext, e: unknown) {
  if (e instanceof TypeError && e.message === 'Unexpected token') {
    const token = ctx.peek()
    if (token.kind === TokenKind.UNRECOGNIZED) {
      ctx.error(new Err.InvalidCharacter(token.value, token))
    } else {
      ctx.error(new Err.UnexpectedToken(token.value, token))
    }
    synchronize(ctx)
  } else {
    throw e
  }
}

function synchronize (ctx: ParserContext) {
  while (true) {
    switch (ctx.next().kind) {
      case TokenKind.EOF:
      case TokenKind.EVENT:
      case TokenKind.FUNCTION:
      case TokenKind.STORAGE:
      case TokenKind.CONTRACT:
      case TokenKind.LET:
      case TokenKind.IF:
      case TokenKind.FOR:
      case TokenKind.WHILE:
      case TokenKind.RETURN:
        return
    }
  }
}
