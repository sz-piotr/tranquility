import { VariableAssignment } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'
import { Nothing } from '../model'

export function evalVariableAssignment (
  node: VariableAssignment,
  environment: Environment
) {
  if (node.left.kind !== 'Identifier') {
    throw new TypeError('Invalid assignment target')
  }
  const value = evalNode(node.right, environment)
  environment.assign(node.left.value, value)
  return Nothing
}
