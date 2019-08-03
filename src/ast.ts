export interface VariableDeclaration {
  type: 'VariableDeclaration',
  identifier: Identifier,
  init: Expression,
}

export function variableDeclaration (
  identifier: Identifier,
  init: Expression
): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    identifier,
    init,
  }
}

export interface Identifier {
  type: 'Identifier',
  name: string,
}

export function identifier (name: string): Identifier {
  return {
    type: 'Identifier',
    name,
  }
}

export interface NumberLiteral {
  type: 'NumberLiteral',
  value: string,
}

export function numberLiteral (value: string): NumberLiteral {
  return {
    type: 'NumberLiteral',
    value,
  }
}

export type Expression
  = NumberLiteral

export type AstNode
  = VariableDeclaration
  | Identifier
  | Expression
