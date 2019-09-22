import { Token, TokenKind } from '../../src/parser/tokens'
import { location, SPAN_ZERO } from '../../src/parser/location'
import { AstNode } from '../../src/parser/ast'
import { CompilationError } from '../../src/errors'

export function resetAstSpans (ast: AstNode): AstNode {
  ast.span = SPAN_ZERO
  if (ast.kind === 'Program') {
    ast.statements.forEach(resetAstSpans)
  } else if (ast.kind === 'VariableDeclaration') {
    resetAstSpans(ast.identifier)
    resetAstSpans(ast.value)
  } else if (ast.kind === 'VariableAssignment') {
    resetAstSpans(ast.left)
    resetAstSpans(ast.right)
  } else if (ast.kind === 'BinaryOperation') {
    resetAstSpans(ast.left)
    resetAstSpans(ast.right)
  } else if (ast.kind === 'FunctionCall') {
    resetAstSpans(ast.callee)
    ast.parameters.forEach(resetAstSpans)
  } else if (ast.kind === 'FunctionDeclaration') {
    resetAstSpans(ast.identifier)
    ast.parameters.forEach(resetAstSpans)
    ast.body.forEach(resetAstSpans)
  }
  return ast
}

export function resetErrorSpans (errors: CompilationError[]) {
  for (const error of errors) {
    error.span = SPAN_ZERO
  }
  return errors
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
