import { Identifier } from '../expressions/Identifier'
import { SPAN_ZERO } from '../../location'

export class UsingDeclaration {
  public kind = 'UsingDeclaration' as const
  constructor (
    public field: Identifier,
    public method: Identifier | undefined,
    public alias: Identifier | undefined,
    public span = SPAN_ZERO
  ) {}
}
