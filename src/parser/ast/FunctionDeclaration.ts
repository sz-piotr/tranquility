import { AstNodeBase } from './AstNodeBase'
import { Identifier } from './Identifier'
import { Statement } from './Statement'
import { SPAN_ZERO } from './Span'

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
