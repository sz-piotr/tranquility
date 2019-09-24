import { StringLiteral } from '../parser/ast'

export function evalStringLiteral (node: StringLiteral) {
  return node.value
}
