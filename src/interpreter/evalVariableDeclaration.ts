import { VariableDeclaration } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'
import { Nothing } from '../model'

export function evalVariableDeclaration (
  node: VariableDeclaration,
  environment: Environment
) {
  const value = evalNode(node.value, environment)
  environment.define(node.identifier.value, value)
  return Nothing
}
