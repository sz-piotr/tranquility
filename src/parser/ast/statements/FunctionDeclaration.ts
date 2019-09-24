import { Identifier } from '../expressions/Identifier'
import { Statement } from '../common/Statement'
import { SPAN_ZERO } from '../../location'

export class FunctionDeclaration {
  kind = 'FunctionDeclaration' as const
  constructor (
    public identifier: Identifier,
    public parameters: Identifier[],
    public body: Statement[],
    public span = SPAN_ZERO
  ) {}
}
