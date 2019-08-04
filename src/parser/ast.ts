type Range = [number, number]

export interface AstNodeBase {
  type: string,
  range: [number, number]
}

export interface Program extends AstNodeBase {
  type: 'Program',
  children: Statement[]
}

export function program (
  children: Statement[],
  range: Range = [0, 0]
): Program {
  return {
    type: 'Program',
    children,
    range
  }
}

export interface VariableDeclaration extends AstNodeBase {
  type: 'VariableDeclaration',
  identifier: Identifier,
  value: Expression
}

export function variableDeclaration (
  identifier: Identifier,
  value: Expression,
  range: Range = [0, 0]
): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    identifier,
    value,
    range
  }
}

export interface VariableAssignment extends AstNodeBase {
  type: 'VariableAssignment',
  identifier: Identifier,
  value: Expression
}

export function variableAssignment (
  identifier: Identifier,
  value: Expression,
  range: Range = [0, 0]
): VariableAssignment {
  return {
    type: 'VariableAssignment',
    identifier,
    value,
    range
  }
}

export interface Identifier extends AstNodeBase {
  type: 'Identifier',
  value: string
}

export function identifier (
  value: string,
  range: Range = [0, 0]
): Identifier {
  return {
    type: 'Identifier',
    value,
    range
  }
}

export interface BinaryOperation extends AstNodeBase {
  type: 'BinaryOperation',
  operator: '+' | '-' | '*' | '/',
  left: Expression,
  right: Expression
}

export function binaryOperation (
  operator: BinaryOperation['operator'],
  left: Expression,
  right: Expression,
  range: Range = [0, 0]
): BinaryOperation {
  return {
    type: 'BinaryOperation',
    operator,
    left,
    right,
    range
  }
}

export interface NumberLiteral extends AstNodeBase {
  type: 'NumberLiteral',
  value: string
}

export function numberLiteral (
  value: string,
  range: Range = [0, 0]
): NumberLiteral {
  return {
    type: 'NumberLiteral',
    value,
    range
  }
}

export interface BooleanLiteral extends AstNodeBase {
  type: 'BooleanLiteral',
  value: boolean
}

export function booleanLiteral (
  value: boolean,
  range: Range = [0, 0]
): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value,
    range
  }
}

export type Statement
  = VariableDeclaration
  | VariableAssignment

export type Expression
  = NumberLiteral
  | BooleanLiteral
  | BinaryOperation

export type AstNode
  = Program
  | Identifier
  | Statement
  | Expression
