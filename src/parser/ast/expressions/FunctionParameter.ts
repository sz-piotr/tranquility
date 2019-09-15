import { Identifier } from './Identifier'
import { Type } from './Type'
import { SPAN_ZERO } from '../../location'

export class FunctionParameter {
  public kind = 'FunctionParameter' as const
  constructor (
    public identifier: Identifier,
    public type: Type | undefined,
    public span = SPAN_ZERO
  ) {}
}
