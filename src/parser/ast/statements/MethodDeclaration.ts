import { Identifier } from '../expressions/Identifier'
import { FunctionParameter } from '../expressions/FunctionParameter'
import { Type } from '../expressions/Type'
import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../../location'

export class MethodDeclaration {
  public kind = 'MethodDeclaration' as const
  constructor (
    public identifier: Identifier,
    public parameters: FunctionParameter[],
    public returnType: Type | undefined,
    public body: Statement[],
    public span = SPAN_ZERO
  ) {}
}
