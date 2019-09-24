import { VariableAssignment } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'

export function evalVariableAssignment (
  node: VariableAssignment,
  environment: Environment
) {
  if (node.left.kind !== 'Identifier') {
    throw new TypeError('Invalid assignment target')
  }
  environment.assign(
    node.left.value,
    evalNode(node.right, environment)
  )
}
