import { AstNodeBase } from '../common/AstNodeBase'
import { MemberDeclaration } from '../common/MemberDeclaration'
import { SPAN_ZERO } from '../../location'

export interface StorageDeclaration extends AstNodeBase {
  kind: 'StorageDeclaration',
  children: MemberDeclaration[]
}

export function storageDeclaration (
  children: MemberDeclaration[],
  span = SPAN_ZERO
): StorageDeclaration {
  return {
    kind: 'StorageDeclaration',
    children,
    span
  }
}
