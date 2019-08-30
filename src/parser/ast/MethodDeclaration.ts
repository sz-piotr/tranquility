import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { FunctionParameter } from './FunctionParameter'
import { Type } from './Type'
import { Statement } from './Statement'
import { SPAN_ZERO } from './Span'

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
