import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

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
