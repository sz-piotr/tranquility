import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { Type } from './Type'
import { SPAN_ZERO } from './Span'

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
