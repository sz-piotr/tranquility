import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'

export class IndexAccess {
  public kind = 'IndexAccess' as const
  constructor (
    public container: Expression,
    public index: Expression,
    public span = SPAN_ZERO
  ) {}
}
