import { BooleanLiteral } from '../parser/ast'

export function evalBooleanLiteral (node: BooleanLiteral) {
  return node.value
}
