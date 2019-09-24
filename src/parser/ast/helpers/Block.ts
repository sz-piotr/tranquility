import { SPAN_ZERO } from '../../location'
import { Statement } from '../common/Statement'

export class Block {
  kind = 'Block' as const
  constructor (
    public statements: Statement[],
    public span = SPAN_ZERO
  ) {}
}
