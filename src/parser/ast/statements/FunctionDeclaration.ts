import { AstNodeBase } from '../common/AstNodeBase'
import { Identifier } from '../expressions/Identifier'
import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../common/Span'

export interface FunctionDeclaration extends AstNodeBase {
  kind: 'FunctionDeclaration',
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[]
}

export function functionDeclaration (
  identifier: Identifier,
  parameters: Identifier[],
  body: Statement[],
  span = SPAN_ZERO
): FunctionDeclaration {
  return {
    kind: 'FunctionDeclaration',
    identifier,
    parameters,
    body,
    span
  }
}
