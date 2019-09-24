import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../../location'

export class Program {
  kind = 'Program' as const
  constructor (
    public statements: Statement[],
    public span = SPAN_ZERO
  ) {}
}
