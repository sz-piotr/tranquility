import { Expression } from '../common/Expression'
import { SPAN_ZERO } from '../../location'
import { Identifier } from '../literals/Identifier'

export class MemberAccess {
  kind = 'MemberAccess' as const
  constructor (
    public container: Expression,
    public member: Identifier,
    public span = SPAN_ZERO
  ) {}
}
