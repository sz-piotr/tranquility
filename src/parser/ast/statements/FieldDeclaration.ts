import { Identifier } from '../literals/Identifier'
import { Type } from '../expressions/Type'
import { SPAN_ZERO } from '../../location'

export class FieldDeclaration {
  kind = 'FieldDeclaration' as const
  constructor (
    public identifier: Identifier,
    public type: Type,
    public span = SPAN_ZERO
  ) {}
}
