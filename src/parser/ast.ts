import { Location } from './location'

export interface AstNodeBase {
  kind: string,
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
  kind: 'Program',
  children: Statement[]
}

export function program (
  children: Statement[],
  span = SPAN_ZERO
): Program {
  return {
    kind: 'Program',
    children,
    span
  }
}

export interface VariableDeclaration extends AstNodeBase {
  kind: 'VariableDeclaration',
  identifier: Identifier,
  value: Expression
}

export function variableDeclaration (
  identifier: Identifier,
  value: Expression,
  span = SPAN_ZERO
): VariableDeclaration {
  return {
    kind: 'VariableDeclaration',
    identifier,
    value,
    span
  }
}

export interface VariableAssignment extends AstNodeBase {
  kind: 'VariableAssignment',
  left: Expression,
  right: Expression
}

export function variableAssignment (
  left: Expression,
  right: Expression,
  span = SPAN_ZERO
): VariableAssignment {
  return {
    kind: 'VariableAssignment',
    left,
    right,
    span
  }
}

export interface FunctionDefinition extends AstNodeBase {
  kind: 'FunctionDefinition',
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
    kind: 'FunctionDefinition',
    identifier,
    parameters,
    body,
    span
  }
}

export interface FunctionCall extends AstNodeBase {
  kind: 'FunctionCall',
  callee: Expression,
  parameters: Expression[]
}

export function functionCall (
  callee: Expression,
  parameters: Expression[],
  span = SPAN_ZERO
): FunctionCall {
  return {
    kind: 'FunctionCall',
    callee,
    parameters,
    span
  }
}

export interface Identifier extends AstNodeBase {
  kind: 'Identifier',
  value: string
}

export function identifier (
  value: string,
  span = SPAN_ZERO
): Identifier {
  return {
    kind: 'Identifier',
    value,
    span
  }
}

export interface BinaryOperation extends AstNodeBase {
  kind: 'BinaryOperation',
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
    kind: 'BinaryOperation',
    operator,
    left,
    right,
    span
  }
}

export interface NumberLiteral extends AstNodeBase {
  kind: 'NumberLiteral',
  value: string
}

export function numberLiteral (
  value: string,
  span = SPAN_ZERO
): NumberLiteral {
  return {
    kind: 'NumberLiteral',
    value,
    span
  }
}

export interface BooleanLiteral extends AstNodeBase {
  kind: 'BooleanLiteral',
  value: boolean
}

export function booleanLiteral (
  value: boolean,
  span = SPAN_ZERO
): BooleanLiteral {
  return {
    kind: 'BooleanLiteral',
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
