import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

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
