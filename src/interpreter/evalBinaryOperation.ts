import { BinaryOperation, BinaryOperator } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'

export function evalBinaryOperation (
  node: BinaryOperation,
  environment: Environment
) {
  const operator = node.operator
  const left = evalNode(node.left, environment)
  const right = evalNode(node.right, environment)
  switch (operator) {
    case BinaryOperator.ADD: return left + right
    case BinaryOperator.SUBTRACT: return left - right
    case BinaryOperator.MULTIPLY: return left * right
    case BinaryOperator.DIVIDE: return left / right
  }
}
