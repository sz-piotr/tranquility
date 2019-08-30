import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { Type } from './Type'
import { SPAN_ZERO } from './Span'

export interface FunctionParameter extends AstNodeBase {
  kind: 'FunctionParameter',
  identifier: Identifier,
  type: Type | undefined
}

export function functionParameter (
  identifier: Identifier,
  type: Type | undefined,
  span = SPAN_ZERO
): FunctionParameter {
  return {
    kind: 'FunctionParameter',
    identifier,
    type,
    span
  }
}
