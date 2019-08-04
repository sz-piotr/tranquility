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

export interface FunctionDefinition extends AstNodeBase {
  type: 'FunctionDefinition',
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[]
}

export function functionDefinition (
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[],
  range: Range = [0, 0]
): FunctionDefinition {
  return {
    type: 'FunctionDefinition',
    identifier,
    parameters,
    body,
    range
  }
}

export interface FunctionCall extends AstNodeBase {
  type: 'FunctionCall',
  callee: Expression,
  parameters: Expression[]
}

export function functionCall (
  callee: Expression,
  parameters: Expression[],
  range: Range = [0, 0]
): FunctionCall {
  return {
    type: 'FunctionCall',
    callee,
    parameters,
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
  | FunctionDefinition
  | Expression

export type Expression
  = NumberLiteral
  | BooleanLiteral
  | BinaryOperation
  | FunctionCall
  | Identifier

export type AstNode
  = Program
  | Statement
