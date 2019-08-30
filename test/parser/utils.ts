import { Token, TokenKind } from '../../src/parser/tokens'
import { location } from '../../src/parser/location'
import { AstNode, SPAN_ZERO } from '../../src/parser/ast'

export function resetRanges (ast: AstNode): AstNode {
  ast.span = SPAN_ZERO
  if (ast.kind === 'Program') {
    ast.children.forEach(resetRanges)
  } else if (ast.kind === 'VariableDeclaration') {
    resetRanges(ast.identifier)
    resetRanges(ast.value)
  } else if (ast.kind === 'VariableAssignment') {
    resetRanges(ast.left)
    resetRanges(ast.right)
  } else if (ast.kind === 'BinaryOperation') {
    resetRanges(ast.left)
    resetRanges(ast.right)
  } else if (ast.kind === 'FunctionCall') {
    resetRanges(ast.callee)
    ast.parameters.forEach(resetRanges)
  } else if (ast.kind === 'FunctionDeclaration') {
    resetRanges(ast.identifier)
    ast.parameters.forEach(resetRanges)
    ast.body.forEach(resetRanges)
  }
  return ast
}

type LocationArray = [number, number, number]

export function token (
  kind: TokenKind,
  value: string,
  start: LocationArray | number = 0,
  end?: LocationArray
): Token {
  const startValue = typeof start === 'number'
    ? location(start, 0, start)
    : location(...start)
  const endValue = end
    ? location(...end)
    : location(
      startValue.position + value.length,
      startValue.line,
      startValue.column + value.length
    )
  return {
    kind,
    value,
    start: startValue,
    end: endValue
  }
}

export function resetLocation (token: Token): Token {
  return {
    ...token,
    start: location(0, 0, 0),
    end: location(token.value.length, 0, token.value.length)
  }
}
