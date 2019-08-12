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
