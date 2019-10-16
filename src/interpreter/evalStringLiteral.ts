import { StringLiteral } from '../parser/ast'
import { StringValue } from '../model'

export function evalStringLiteral (node: StringLiteral) {
  return new StringValue(node.value)
}
