import { NumberLiteral } from '../parser/ast'

export function evalNumberLiteral (node: NumberLiteral) {
  return Number.parseFloat(node.value)
}
