import { TokenKind } from '../../tokens'
import { UnaryOperator, BinaryOperator } from '../../ast'

export function getBinaryOperator (kind: TokenKind): BinaryOperator {
  switch (kind) {
    case TokenKind.PLUS: return BinaryOperator.ADD
    case TokenKind.MINUS: return BinaryOperator.SUBTRACT
    case TokenKind.STAR: return BinaryOperator.MULTIPLY
    case TokenKind.SLASH: return BinaryOperator.DIVIDE
    case TokenKind.PERCENT: return BinaryOperator.REMAINDER
    case TokenKind.EQUALS_EQUALS: return BinaryOperator.EQUAL
    case TokenKind.BANG_EQUALS: return BinaryOperator.NOT_EQUAL
    case TokenKind.LEFT: return BinaryOperator.LESS
    case TokenKind.LEFT_EQUALS: return BinaryOperator.LESS_OR_EQUAL
    case TokenKind.RIGHT: return BinaryOperator.GREATER
    case TokenKind.RIGHT_EQUALS: return BinaryOperator.GREATER_OR_EQUAL
    case TokenKind.AND: return BinaryOperator.AND
    case TokenKind.OR: return BinaryOperator.OR
  }
  throw new TypeError('Invalid operator')
}

export function getUnaryOperator (kind: TokenKind): UnaryOperator {
  switch (kind) {
    case TokenKind.PLUS: return UnaryOperator.PLUS
    case TokenKind.MINUS: return UnaryOperator.MINUS
    case TokenKind.BANG: return UnaryOperator.NOT
  }
  throw new TypeError('Invalid operator')
}
