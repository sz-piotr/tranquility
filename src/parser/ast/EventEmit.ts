import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { Expression } from './Expression'
import { SPAN_ZERO } from './Span'

export interface EventEmit extends AstNodeBase {
  kind: 'EventEmit',
  event: Identifier,
  parameters: Expression[]
}

export function eventEmit (
  event: Identifier,
  parameters: Expression[],
  span = SPAN_ZERO
): EventEmit {
  return {
    kind: 'EventEmit',
    event,
    parameters,
    span
  }
}
