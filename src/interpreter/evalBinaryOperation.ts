import { BinaryOperation, BinaryOperator } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'
import { ProgramValue, NumberValue } from '../model'

export function evalBinaryOperation (
  node: BinaryOperation,
  environment: Environment
) {
  const operator = node.operator
  const left = evalNode(node.left, environment)
  const right = evalNode(node.right, environment)

  switch (operator) {
    case BinaryOperator.ADD: return evalAdd(left, right)
    case BinaryOperator.SUBTRACT: return evalSub(left, right)
    case BinaryOperator.MULTIPLY: return evalMul(left, right)
    case BinaryOperator.DIVIDE: return evalDiv(left, right)
    case BinaryOperator.REMAINDER: return evalRem(left, right)
  }
  throw new Error('Unsupported binary operator')
}

function evalAdd (left: ProgramValue, right: ProgramValue) {
  if (left instanceof NumberValue && right instanceof NumberValue) {
    return left.add(right)
  }
  throw new Error('Type mismatch')
}

function evalSub (left: ProgramValue, right: ProgramValue) {
  if (left instanceof NumberValue && right instanceof NumberValue) {
    return left.sub(right)
  }
  throw new Error('Type mismatch')
}

function evalMul (left: ProgramValue, right: ProgramValue) {
  if (left instanceof NumberValue && right instanceof NumberValue) {
    return left.mul(right)
  }
  throw new Error('Type mismatch')
}

function evalDiv (left: ProgramValue, right: ProgramValue) {
  if (left instanceof NumberValue && right instanceof NumberValue) {
    return left.div(right)
  }
  throw new Error('Type mismatch')
}

function evalRem (left: ProgramValue, right: ProgramValue) {
  if (left instanceof NumberValue && right instanceof NumberValue) {
    return left.rem(right)
  }
  throw new Error('Type mismatch')
}
