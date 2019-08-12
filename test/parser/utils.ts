import { Token, TokenType } from '../../src/parser/tokens'
import { location } from '../../src/parser/location'
import { AstNode, LOC_ZERO } from '../../src/parser/ast'

export function resetRanges (ast: AstNode): AstNode {
  ast.loc = LOC_ZERO
  if (ast.type === 'Program') {
    ast.children.forEach(resetRanges)
  } else if (ast.type === 'VariableDeclaration') {
    resetRanges(ast.identifier)
    resetRanges(ast.value)
  } else if (ast.type === 'BinaryOperation') {
    resetRanges(ast.left)
    resetRanges(ast.right)
  } else if (ast.type === 'FunctionCall') {
    resetRanges(ast.callee)
    ast.parameters.forEach(resetRanges)
  } else if (ast.type === 'FunctionDefinition') {
    resetRanges(ast.identifier)
    ast.parameters.forEach(resetRanges)
    ast.body.forEach(resetRanges)
  }
  return ast
}

type LocationArray = [number, number, number]

export function token (
  type: TokenType,
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
    type,
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
