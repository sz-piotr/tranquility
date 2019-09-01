import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../common/Span'

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
