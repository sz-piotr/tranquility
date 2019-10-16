import { BooleanLiteral } from '../parser/ast'
import { BooleanValue } from '../model'

export function evalBooleanLiteral (node: BooleanLiteral) {
  return new BooleanValue(node.value)
}
