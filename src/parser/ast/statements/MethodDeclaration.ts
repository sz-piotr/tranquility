import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { FunctionParameter } from '../expressions/FunctionParameter'
import { Type } from '../expressions/Type'
import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../../location'

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
