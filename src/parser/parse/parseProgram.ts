import { ParserContext } from './ParserContext'
import { TokenKind } from '../tokens'
import { parseStatement } from './parseStatement'
import { Program } from '../ast'
import { InvalidCharacter, UnexpectedToken } from '../../errors'

export function parseProgram (ctx: ParserContext) {
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

  return new Program(children, { start, end: ctx.peek().end })
}

function handleError (ctx: ParserContext, e: unknown) {
  if (e instanceof TypeError && e.message === 'Unexpected token') {
    const token = ctx.peek()
    if (token.kind === TokenKind.UNRECOGNIZED) {
      ctx.error(new InvalidCharacter(token.value, token))
    } else {
      ctx.error(new UnexpectedToken(token.value, token))
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
