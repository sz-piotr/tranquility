import { TokenStream } from '../lexer/TokenStream'
import * as Ast from './ast'

export function parse(source: string) {
  return parseStream(TokenStream.fromString(source))
}

function parseStream(stream: TokenStream) {
  return parseProgram()

  function at(type: string, value?: string) {
    const token = stream.peek()
    return token.type === type && (!value || token.value === value)
  }

  function expect(type: string, value?: string) {
    if (at(type, value)) {
      return stream.next()
    }
    return fail()
  }

  function fail(): never {
    const token = stream.peek()
    throw new TypeError(`Unexpected token ${token.type}: "${token.value}" at: [${token.start}, ${token.end}]`)
  }

  function parseProgram(): Ast.AstNode {
    const children = []

    while (!at('eof')) {
      while (at('newline')) {
        stream.next()
      }
      children.push(parseStatement())
      if (at('newline')) {
        stream.next()
      } else {
        expect('eof')
      }
    }

    return Ast.program(children, [0, stream.peek().end])
  }

  function parseStatement() {
    if (at('keyword', 'let')) {
      return parseVariableDeclaration()
    }
    return parseVariableAssignment()
  }

  function parseVariableDeclaration() {
    const { start } = stream.next()
    const identifier = parseIdentifier()
    expect('operator', '=')
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, [start, value.range[1]])
  }

  function parseVariableAssignment() {
    const identifier = parseIdentifier()
    expect('operator', '=')
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, [identifier.range[0], value.range[1]])
  }

  function parseExpression() {
    if (at('number')) {
      return parseNumberLiteral()
    }

    if (at('keyword', 'true') || at('keyword', 'false')) {
      return parseBooleanLiteral()
    }

    return fail()
  }

  function parseNumberLiteral() {
    const { start, end, value } = stream.next()
    return Ast.numberLiteral(value, [start, end])
  }

  function parseBooleanLiteral() {
    const { start, end, value } = stream.next()
    return Ast.booleanLiteral(value === 'true', [start, end])
  }

  function parseIdentifier() {
    const { start, end, value } = expect('identifier')
    return Ast.identifier(value, [start, end])
  }
}
