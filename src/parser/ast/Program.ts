import { AstNodeBase } from './AstNodeBase'
import { Statement } from './Statement'
import { SPAN_ZERO } from './Span'

export interface Program extends AstNodeBase {
  kind: 'Program',
  children: Statement[]
}

export function program (
  children: Statement[],
  span = SPAN_ZERO
): Program {
  return {
    kind: 'Program',
    children,
    span
  }
}
