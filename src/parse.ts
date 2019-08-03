import { AstNode } from './ast'
import { Parser } from './parser'

const parser = new Parser<AstNode>(function (Token, All, Any, Plus, Optional, Node) {
  Token(/\s+/g, 'ignore')

  const NumericLiteral = Node(
    Token(/\b(\d+)\b/g, 'number'),
    ([value]) => ({ type: 'NumberLiteral', value })
  )

  const Let = Token(/\blet\b/g, 'let')
  const Assignment = Token(/\=/g, '=')

  const Identifier = Node(
    Token(/\b(\w+)\b/g, 'identifier'),
    ([name]) => ({ type: 'Identifier', name })
  )

  const VariableDeclaration = Node(
    All(
      Let,
      Identifier,
      Assignment,
      NumericLiteral
    ),
    ([identifier, init]) => ({ type: 'VariableDeclaration', identifier, init })
  )

  return VariableDeclaration
})

export function parse (source: string): AstNode {
  return parser.parse(source)
}
