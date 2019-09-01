import { AstNodeBase } from '../common/AstNodeBase'
import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../../location'

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
