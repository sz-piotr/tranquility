import { NumberLiteral } from '../parser/ast'
import { NumberValue } from '../model'

export function evalNumberLiteral (node: NumberLiteral) {
  const parsed = Number.parseFloat(node.value)
  return new NumberValue(parsed)
}
