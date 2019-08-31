import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { SPAN_ZERO } from './Span'

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