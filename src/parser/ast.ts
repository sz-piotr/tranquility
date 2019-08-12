import { Location } from '../scanner/tokens'

export interface AstNodeBase {
  type: string,
  loc: {
    start: Location,
    end: Location
  }
}

export const LOC_ZERO: AstNodeBase['loc'] = {
  start: { position: 0, line: 0, column: 0 },
  end: { position: 0, line: 0, column: 0 }
}

export interface Program extends AstNodeBase {
  type: 'Program',
  children: Statement[]
}

export function program (
  children: Statement[],
  loc = LOC_ZERO
): Program {
  return {
    type: 'Program',
    children,
    loc
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
  loc = LOC_ZERO
): VariableDeclaration {
  return {
    type: 'VariableDeclaration',
    identifier,
    value,
    loc
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
  loc = LOC_ZERO
): FunctionDefinition {
  return {
    type: 'FunctionDefinition',
    identifier,
    parameters,
    body,
    loc
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
  loc = LOC_ZERO
): FunctionCall {
  return {
    type: 'FunctionCall',
    callee,
    parameters,
    loc
  }
}

export interface Identifier extends AstNodeBase {
  type: 'Identifier',
  value: string
}

export function identifier (
  value: string,
  loc = LOC_ZERO
): Identifier {
  return {
    type: 'Identifier',
    value,
    loc
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
  loc = LOC_ZERO
): BinaryOperation {
  return {
    type: 'BinaryOperation',
    operator,
    left,
    right,
    loc
  }
}

export interface NumberLiteral extends AstNodeBase {
  type: 'NumberLiteral',
  value: string
}

export function numberLiteral (
  value: string,
  loc = LOC_ZERO
): NumberLiteral {
  return {
    type: 'NumberLiteral',
    value,
    loc
  }
}

export interface BooleanLiteral extends AstNodeBase {
  type: 'BooleanLiteral',
  value: boolean
}

export function booleanLiteral (
  value: boolean,
  loc = LOC_ZERO
): BooleanLiteral {
  return {
    type: 'BooleanLiteral',
    value,
    loc
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
