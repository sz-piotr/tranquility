import { Identifier } from '../literals/Identifier'
import { Type } from './Type'
import { SPAN_ZERO } from '../../location'

export class FunctionParameter {
  kind = 'FunctionParameter' as const
  constructor (
    public identifier: Identifier,
    public type: Type | undefined,
    public span = SPAN_ZERO
  ) {}
}
