import { TokenKind } from '../tokens'
import * as Ast from '../ast'

export function getOperation (kind: TokenKind): Ast.BinaryOperator {
  switch (kind) {
    case TokenKind.PLUS: return Ast.BinaryOperator.ADD
    case TokenKind.MINUS: return Ast.BinaryOperator.SUBTRACT
    case TokenKind.STAR: return Ast.BinaryOperator.MULTIPLY
    case TokenKind.SLASH: return Ast.BinaryOperator.DIVIDE
    case TokenKind.EQUALS_EQUALS: return Ast.BinaryOperator.EQUAL
    case TokenKind.BANG_EQUALS: return Ast.BinaryOperator.NOT_EQUAL
    case TokenKind.LEFT: return Ast.BinaryOperator.LESS
    case TokenKind.LEFT_EQUALS: return Ast.BinaryOperator.LESS_OR_EQUAL
    case TokenKind.RIGHT: return Ast.BinaryOperator.GREATER
    case TokenKind.RIGHT_EQUALS: return Ast.BinaryOperator.GREATER_OR_EQUAL
  }
  throw new TypeError('Invalid operator')
}
