import { Identifier } from './Identifier'
import { SPAN_ZERO } from '../../location'

export class Type {
  kind = 'Type' as const
  constructor (
    public identifier: Identifier,
    public parameters: Type[],
    public span = SPAN_ZERO
  ) {}
}
