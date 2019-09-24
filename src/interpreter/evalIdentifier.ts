import { Identifier } from '../parser/ast'
import { Environment } from './Environment'

export function evalIdentifier (
  node: Identifier,
  environment: Environment
) {
  return environment.get(node.value)
}
