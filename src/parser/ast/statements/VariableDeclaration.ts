import { Identifier } from '../expressions/Identifier'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class VariableDeclaration {
  kind = 'VariableDeclaration' as const
  constructor (
    public identifier: Identifier,
    public value: Expression,
    public span = SPAN_ZERO
  ) {}
}
