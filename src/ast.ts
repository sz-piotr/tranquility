export interface AstVariableDeclarationNode {
  type: 'VARIABLE_DECLARATION',
}

export interface AstIdentifierNode {
  type: 'IDENTIFIER',
}

export type AstNode
  = AstVariableDeclarationNode
  | AstIdentifierNode
