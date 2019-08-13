import { Location } from './location'

export interface AstNodeBase {
  type: string,
  span: {
    start: Location,
    end: Location
  }
}

export interface Span {
  start: Location,
  end: Location
}

export const SPAN_ZERO: Span = {
  start: { position: 0, line: 0, column: 0 },
  end: { position: 0, line: 0, column: 0 }
}

export interface Program extends AstNodeBase {
  type: 'Program',
  children: Statement[]
}

export function program (
  children: Statement[],
  span = SPAN_ZERO
): Program {
  return {
    type: 'Program',
    children,
    span
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
  span = SPAN_ZERO
): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    identifier,
    value,
    span
  }
}

export interface VariableAssignment extends AstNodeBase {
  type: 'VariableAssignment',
  left: Expression,
  right: Expression
}

export function variableAssignment (
  left: Expression,
  right: Expression,
  span = SPAN_ZERO
): VariableAssignment {
  return {
    type: 'VariableAssignment',
    left,
    right,
    span
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
  span = SPAN_ZERO
): FunctionDefinition {
  return {
    type: 'FunctionDefinition',
    identifier,
    parameters,
    body,
    span
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
  span = SPAN_ZERO
): FunctionCall {
  return {
    type: 'FunctionCall',
    callee,
    parameters,
    span
  }
}

export interface Identifier extends AstNodeBase {
  type: 'Identifier',
  value: string
}

export function identifier (
  value: string,
  span = SPAN_ZERO
): Identifier {
  return {
    type: 'Identifier',
    value,
    span
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
  span = SPAN_ZERO
): BinaryOperation {
  return {
    type: 'BinaryOperation',
    operator,
    left,
    right,
    span
  }
}

export interface NumberLiteral extends AstNodeBase {
  type: 'NumberLiteral',
  value: string
}

export function numberLiteral (
  value: string,
  span = SPAN_ZERO
): NumberLiteral {
  return {
    type: 'NumberLiteral',
    value,
    span
  }
}

export interface BooleanLiteral extends AstNodeBase {
  type: 'BooleanLiteral',
  value: boolean
}

export function booleanLiteral (
  value: boolean,
  span = SPAN_ZERO
): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value,
    span
  }
}

export type Statement
  = VariableDeclaration
  | VariableAssignment
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
