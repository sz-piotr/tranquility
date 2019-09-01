import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { SPAN_ZERO } from '../common/Span'

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
