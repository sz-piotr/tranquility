import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { Type } from '../expressions/Type'
import { SPAN_ZERO } from '../../location'

export interface FieldDeclaration extends AstNodeBase {
  kind: 'FieldDeclaration',
  identifier: Identifier,
  type: Type
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
