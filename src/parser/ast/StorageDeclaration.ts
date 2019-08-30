import { AstNodeBase } from './AstNodeBase'
import { MemberDeclaration } from './MemberDeclaration'
import { SPAN_ZERO } from './Span'

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
