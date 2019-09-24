import { VariableDeclaration } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'

export function evalVariableDeclaration (
  node: VariableDeclaration,
  environment: Environment
) {
  environment.define(
    node.identifier.value,
    evalNode(node.value, environment)
  )
}
