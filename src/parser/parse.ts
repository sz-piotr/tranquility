import { Scanner } from '../scanner/Scanner'
import { TokenType } from '../scanner/tokens'
import * as Ast from './ast'

export function parse(source: string) {
  return parseStream(Scanner.fromString(source))
}

function parseStream(stream: Scanner) {
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
    const { start } = stream.peek()

    while (!at(TokenType.EOF)) {
      children.push(parseStatement())
    }
    expect(TokenType.EOF)

    return Ast.program(children, [start, stream.peek().end])
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

    expect(TokenType.PAREN_LEFT)
    const parameters = parseFunctionParameters()
    expect(TokenType.PAREN_RIGHT)

    expect(TokenType.CURLY_LEFT)
    const body = parseFunctionBody()
    const { end } = expect(TokenType.CURLY_RIGHT)

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
    while (!at(TokenType.CURLY_RIGHT)) {
      body.push(parseStatement())
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
    while (at(TokenType.PAREN_LEFT)) {
      expect(TokenType.PAREN_LEFT)
      const parameters: Ast.Expression[] = []
      while(!at(TokenType.PAREN_RIGHT)) {
        parameters.push(parseExpression())
        if (!at(TokenType.COMMA)) {
          break
        }
        expect(TokenType.COMMA)
      }
      const { end } = expect(TokenType.PAREN_RIGHT)
      result = Ast.functionCall(
        result,
        parameters,
        [start, end]
      )
    }
    return result
  }

  function parseFactor () {
    if (at(TokenType.PAREN_LEFT)) {
      stream.next()
      const expression = parseExpression()
      expect(TokenType.PAREN_RIGHT)
      return expression
    }
    return parseLiteral()
  }

  function parseLiteral () {
    if (at(TokenType.NUMBER)) {
      return parseNumberLiteral()
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

  function parseIdentifier() {
    const { start, end, value } = expect(TokenType.IDENTIFIER)
    return Ast.identifier(value, [start, end])
  }
}
