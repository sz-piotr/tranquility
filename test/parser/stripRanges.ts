import { AstNode } from '../../src/parser/ast'

export function stripRanges (ast: AstNode): AstNode {
  ast.range[0] = 0
  ast.range[1] = 0
  if (ast.type === 'Program') {
    ast.children.forEach(stripRanges)
  } else if (ast.type === 'VariableDeclaration') {
    stripRanges(ast.identifier)
    stripRanges(ast.value)
  } else if (ast.type === 'BinaryOperation') {
    stripRanges(ast.left)
    stripRanges(ast.right)
  } else if (ast.type === 'FunctionCall') {
    stripRanges(ast.callee)
    ast.parameters.forEach(stripRanges)
  } else if (ast.type === 'FunctionDefinition') {
    stripRanges(ast.identifier)
    ast.parameters.forEach(stripRanges)
    ast.body.forEach(stripRanges)
  }
  return ast
}
