import { MemberDeclaration } from '../common/MemberDeclaration'
import { SPAN_ZERO } from '../../location'

export class StorageDeclaration {
  public kind = 'StorageDeclaration' as const
  constructor (
    public children: MemberDeclaration[],
    public span = SPAN_ZERO
  ) {}
}
