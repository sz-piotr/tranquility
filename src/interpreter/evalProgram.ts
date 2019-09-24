import { Program } from '../parser/ast'
import { evalNode } from './evalNode'
import { Environment } from './Environment'

export function evalProgram (
  node: Program,
  environment: Environment
) {
  let result
  for (const child of node.statements) {
    result = evalNode(child, environment)
  }
  return result
}
