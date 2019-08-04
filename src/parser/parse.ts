import { TokenStream } from '../lexer/TokenStream'
import { TokenType } from '../lexer/tokens'
import * as Ast from './ast'

export function parse(source: string) {
  return parseStream(TokenStream.fromString(source))
}

function parseStream(stream: TokenStream) {
  return parseProgram()

  // HELPERS
  // -------

  function at(type: TokenType) {
    const token = stream.peek()
    return token.type === type
  }

  function expect(type: TokenType) {
    if (at(type)) {
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
    while (!at(TokenType.EOF)) {
      children.push(parseStatement())
      parseEndOfStatement()
    }
    expect(TokenType.EOF)

    return Ast.program(children, [0, stream.peek().end])
  }

  function parseEndOfStatement () {
    expect(TokenType.NEWLINE)
    skipNewlines()
  }

  function skipNewlines () {
    while (at(TokenType.NEWLINE)) {
      stream.next()
    }
  }

  function parseStatement() {
    if (at(TokenType.LET)) {
      return parseVariableDeclaration()
    }
    if (at(TokenType.FUNCTION)) {
      return parseFunctionDefinition()
    }
    return parseExpression()
  }

  function parseVariableDeclaration() {
    const { start } = expect(TokenType.LET)
    const identifier = parseIdentifier()
    expect(TokenType.EQUAL)
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, [start, value.range[1]])
  }

  function parseFunctionDefinition () {
    const { start } = expect(TokenType.FUNCTION)
    const identifier = parseIdentifier()

    expect(TokenType.LEFT_PAREN)
    const parameters = parseFunctionParameters()
    expect(TokenType.RIGHT_PAREN)

    expect(TokenType.LEFT_BRACE)
    skipNewlines()
    const body = parseFunctionBody()
    const { end } = expect(TokenType.RIGHT_BRACE)

    return Ast.functionDefinition(identifier, parameters, body, [start, end])
  }

  function parseFunctionParameters () {
    const parameters: Ast.Identifier[] = []
    while(at(TokenType.IDENTIFIER)) {
      parameters.push(parseIdentifier())
      if (!at(TokenType.COMMA)) {
        break
      }
      expect(TokenType.COMMA)
    }
    return parameters
  }

  function parseFunctionBody () {
    const body: Ast.Statement[] = []
    while (!at(TokenType.RIGHT_BRACE)) {
      body.push(parseStatement())
      parseEndOfStatement()
    }
    return body
  }

  function parseExpression(): Ast.Expression {
    let { start } = stream.peek()
    let result: Ast.Expression = parseTerm()
    while (at(TokenType.PLUS) || at(TokenType.MINUS)) {
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
    while (at(TokenType.STAR) || at(TokenType.SLASH)) {
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
    while (at(TokenType.LEFT_PAREN)) {
      expect(TokenType.LEFT_PAREN)
      const parameters: Ast.Expression[] = []
      skipNewlines()
      while(!at(TokenType.RIGHT_PAREN)) {
        parameters.push(parseExpression())
        skipNewlines()
        if (!at(TokenType.COMMA)) {
          break
        }
        expect(TokenType.COMMA)
        skipNewlines()
      }
      const { end } = expect(TokenType.RIGHT_PAREN)
      result = Ast.functionCall(
        result,
        parameters,
        [start, end]
      )
    }
    return result
  }

  function parseFactor () {
    if (at(TokenType.LEFT_PAREN)) {
      stream.next()
      const expression = parseExpression()
      expect(TokenType.RIGHT_PAREN)
      return expression
    }
    return parseLiteral()
  }

  function parseLiteral () {
    if (at(TokenType.NUMBER)) {
      return parseNumberLiteral()
    }

    if (at(TokenType.TRUE) || at(TokenType.FALSE)) {
      return parseBooleanLiteral()
    }

    if (at(TokenType.IDENTIFIER)) {
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
    const { start, end, value } = expect(TokenType.IDENTIFIER)
    return Ast.identifier(value, [start, end])
  }
}
