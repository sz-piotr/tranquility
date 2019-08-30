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

export interface FunctionDeclaration extends AstNodeBase {
  kind: 'FunctionDeclaration',
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[]
}

export function functionDeclaration (
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[],
  span = SPAN_ZERO
): FunctionDeclaration {
  return {
    kind: 'FunctionDeclaration',
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

export interface StorageDeclaration extends AstNodeBase {
  kind: 'StorageDeclaration',
  children: MemberDeclaration[],
}

export function storageDeclaration (
  children: MemberDeclaration[],
  span = SPAN_ZERO
): StorageDeclaration {
  return {
    kind: 'StorageDeclaration',
    children,
    span
  }
}

export type MemberDeclaration
  = FieldDeclaration
  | UsingDeclaration
  | MethodDeclaration

export interface FieldDeclaration extends AstNodeBase {
  kind: 'FieldDeclaration',
  identifier: Identifier,
  type: Type,
}

export function fieldDeclaration (
  identifier: Identifier,
  type: Type,
  span = SPAN_ZERO
): FieldDeclaration {
  return {
    kind: 'FieldDeclaration',
    identifier,
    type,
    span
  }
}

export interface UsingDeclaration extends AstNodeBase {
  kind: 'UsingDeclaration',
  field: Identifier,
  method: Identifier | undefined,
  alias: Identifier | undefined
}

export function usingDeclaration (
  field: Identifier,
  method: Identifier | undefined,
  alias: Identifier | undefined,
  span = SPAN_ZERO
): UsingDeclaration {
  return {
    kind: 'UsingDeclaration',
    field,
    method,
    alias,
    span
  }
}

export interface MethodDeclaration extends AstNodeBase {
  kind: 'MethodDeclaration',
  identifier: Identifier,
  parameters: FunctionParameter[],
  returnType: Type | undefined,
  body: Statement[]
}

export function methodDeclaration (
  identifier: Identifier,
  parameters: FunctionParameter[],
  returnType: Type | undefined,
  body: Statement[],
  span = SPAN_ZERO
): MethodDeclaration {
  return {
    kind: 'MethodDeclaration',
    identifier,
    parameters,
    returnType,
    body,
    span
  }
}

export interface FunctionParameter extends AstNodeBase {
  kind: 'FunctionParameter',
  identifier: Identifier,
  type: Type | undefined
}

export function functionParameter (
  identifier: Identifier,
  type: Type | undefined,
  span = SPAN_ZERO
): FunctionParameter {
  return {
    kind: 'FunctionParameter',
    identifier,
    type,
    span
  }
}

export interface ReturnStatement extends AstNodeBase {
  kind: 'ReturnStatement'
  value: Expression
}

export function returnStatement (
  value: Expression,
  span = SPAN_ZERO
): ReturnStatement {
  return {
    kind: 'ReturnStatement',
    value,
    span
  }
}

export interface Type extends AstNodeBase {
  kind: 'Type',
  identifier: Identifier,
  parameters: Type[]
}

export function type (
  identifier: Identifier,
  parameters: Type[],
  span = SPAN_ZERO
): Type {
  return {
    kind: 'Type',
    identifier,
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

export enum Operator {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  EQUAL,
  NOT_EQUAL,
  GREATER,
  GREATER_OR_EQUAL,
  LESS,
  LESS_OR_EQUAL
}

export interface BinaryOperation extends AstNodeBase {
  kind: 'BinaryOperation',
  operator: Operator,
  left: Expression,
  right: Expression
}

export function binaryOperation (
  operator: Operator,
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
  | FunctionDeclaration
  | StorageDeclaration
  | ReturnStatement
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
