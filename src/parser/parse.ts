import { TokenStream } from '../lexer/TokenStream'
import * as Ast from './ast'

export function parse(source: string) {
  return parseStream(TokenStream.fromString(source))
}

function parseStream(stream: TokenStream) {
  return parseProgram()

  // HELPERS
  // -------

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
    const { type, value, start, end } = stream.peek()
    throw new TypeError(
      `Unexpected token ${type}: ${JSON.stringify(value)} at: [${start}, ${end}]`
    )
  }

  // CORE PARSER
  // -----------

  function parseProgram(): Ast.AstNode {
    const children = []

    skipNewlines()
    while (!at('eof')) {
      children.push(parseStatement())
      parseEndOfStatement()
    }
    expect('eof')

    return Ast.program(children, [0, stream.peek().end])
  }

  function parseEndOfStatement () {
    expect('newline')
    skipNewlines()
  }

  function skipNewlines () {
    while (at('newline')) {
      stream.next()
    }
  }

  function parseStatement() {
    if (at('keyword', 'let')) {
      return parseVariableDeclaration()
    }
    if (at('keyword', 'function')) {
      return parseFunctionDefinition()
    }
    return parseExpression()
  }

  function parseVariableDeclaration() {
    const { start } = expect('keyword', 'let')
    const identifier = parseIdentifier()
    expect('operator', '=')
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, [start, value.range[1]])
  }

  function parseFunctionDefinition () {
    const { start } = expect('keyword', 'function')
    const identifier = parseIdentifier()

    expect('punctuation', '(')
    const parameters = parseFunctionParameters()
    expect('punctuation', ')')

    expect('punctuation', '{')
    skipNewlines()
    const body = parseFunctionBody()
    const { end } = expect('punctuation', '}')

    return Ast.functionDefinition(identifier, parameters, body, [start, end])
  }

  function parseFunctionParameters () {
    const parameters: Ast.Identifier[] = []
    while(at('identifier')) {
      parameters.push(parseIdentifier())
      if (!at('punctuation', ',')) {
        break
      }
      expect('punctuation', ',')
    }
    return parameters
  }

  function parseFunctionBody () {
    const body: Ast.Statement[] = []
    while (!at('punctuation', '}')) {
      body.push(parseStatement())
      parseEndOfStatement()
    }
    return body
  }

  function parseExpression(): Ast.Expression {
    let { start } = stream.peek()
    let result: Ast.Expression = parseTerm()
    while (at('operator', '+') || at('operator', '-')) {
      const { value } = stream.next()
      const right = parseTerm()
      result = Ast.binaryOperation(
        value as Ast.BinaryOperation['operator'],
        result,
        right,
        [start, stream.peek().end]
      )
    }
    return result
  }

  function parseTerm () {
    let { start } = stream.peek()
    let result: Ast.Expression = parseCallOrFactor()
    while (at('operator', '*') || at('operator', '/')) {
      const { value } = stream.next()
      const right = parseCallOrFactor()
      result = Ast.binaryOperation(
        value as Ast.BinaryOperation['operator'],
        result,
        right,
        [start, stream.peek().end]
      )
    }
    return result
  }

  function parseCallOrFactor (): Ast.Expression {
    const { start } = stream.peek()
    let result = parseFactor()
    while (at('punctuation', '(')) {
      expect('punctuation', '(')
      const parameters: Ast.Expression[] = []
      skipNewlines()
      while(!at('punctuation', ')')) {
        parameters.push(parseExpression())
        skipNewlines()
        if (!at('punctuation', ',')) {
          break
        }
        expect('punctuation', ',')
        skipNewlines()
      }
      const { end } = expect('punctuation', ')')
      result = Ast.functionCall(
        result,
        parameters,
        [start, end]
      )
    }
    return result
  }

  function parseFactor () {
    if (at('punctuation', '(')) {
      stream.next()
      const expression = parseExpression()
      expect('punctuation', ')')
      return expression
    }
    return parseLiteral()
  }

  function parseLiteral () {
    if (at('number')) {
      return parseNumberLiteral()
    }

    if (at('keyword', 'true') || at('keyword', 'false')) {
      return parseBooleanLiteral()
    }

    if (at('identifier')) {
      return parseIdentifier()
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
