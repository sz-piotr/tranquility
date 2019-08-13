import { Scanner } from './Scanner'
import { TokenType, Token } from './tokens'
import * as Ast from './ast'
import * as Err from '../errors'

export interface ParseResult {
  ast: Ast.AstNode,
  errors: Err.Error[]
}

export function parse (source: string) {
  return parseStream(Scanner.fromString(source))
}

class UnexpectedToken {
  constructor (public token: Token) {}
}

function parseStream (stream: Scanner) {
  const errors: Err.Error[] = []
  return parseProgram()

  // HELPERS
  // -------

  function at (type: TokenType) {
    const token = stream.peek()
    return token.type === type
  }

  function expect (type: TokenType) {
    if (at(type)) {
      return stream.next()
    }
    return fail()
  }

  function fail (): never {
    throw new UnexpectedToken(stream.peek())
  }

  // CORE PARSER
  // -----------

  function parseProgram (): ParseResult {
    const children = []
    const { start } = stream.peek()

    while (!at(TokenType.EOF)) {
      try {
        children.push(parseStatement())
      } catch (e) {
        handleError(e)
      }
    }
    expect(TokenType.EOF)

    return {
      ast: Ast.program(children, { start, end: stream.peek().end }),
      errors
    }
  }

  function handleError (e: unknown) {
    if (e instanceof UnexpectedToken) {
      const token = e.token
      if (token.type === TokenType.UNRECOGNIZED) {
        errors.push(Err.InvalidCharacter(token.value, token))
      } else {
        errors.push(Err.UnexpectedToken(token.value, token))
      }
      synchronize()
    } else {
      throw e
    }
  }

  function synchronize () {
    while (true) {
      switch (stream.next().type) {
        case TokenType.EOF:
        case TokenType.EVENT:
        case TokenType.FUNCTION:
        case TokenType.STORAGE:
        case TokenType.CONTRACT:
        case TokenType.LET:
        case TokenType.IF:
        case TokenType.FOR:
        case TokenType.WHILE:
        case TokenType.RETURN:
          return
      }
    }
  }

  function parseStatement () {
    if (at(TokenType.LET)) {
      return parseVariableDeclaration()
    }
    if (at(TokenType.FUNCTION)) {
      return parseFunctionDefinition()
    }
    return parseExpression()
  }

  function parseVariableDeclaration () {
    const { start } = expect(TokenType.LET)
    const identifier = parseIdentifier()
    expect(TokenType.EQUALS)
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, { start, end: value.span.end })
  }

  function parseFunctionDefinition () {
    const { start } = expect(TokenType.FUNCTION)
    const identifier = parseIdentifier()

    expect(TokenType.PAREN_OPEN)
    const parameters = parseFunctionParameters()
    expect(TokenType.PAREN_CLOSE)

    expect(TokenType.CURLY_OPEN)
    const body = parseFunctionBody()
    const { end } = expect(TokenType.CURLY_CLOSE)

    return Ast.functionDefinition(identifier, parameters, body, { start, end })
  }

  function parseFunctionParameters () {
    const parameters: Ast.Identifier[] = []
    while (at(TokenType.IDENTIFIER)) {
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
    while (!at(TokenType.CURLY_CLOSE)) {
      body.push(parseStatement())
    }
    return body
  }

  function parseExpression (): Ast.Expression {
    const { start } = stream.peek()
    let result: Ast.Expression = parseTerm()
    while (at(TokenType.PLUS) || at(TokenType.MINUS)) {
      const { value } = stream.next()
      const right = parseTerm()
      result = Ast.binaryOperation(
        value as Ast.BinaryOperation['operator'],
        result,
        right,
        { start, end: stream.peek().end }
      )
    }
    return result
  }

  function parseTerm () {
    const { start } = stream.peek()
    let result: Ast.Expression = parseCallOrFactor()
    while (at(TokenType.STAR) || at(TokenType.SLASH)) {
      const { value } = stream.next()
      const right = parseCallOrFactor()
      result = Ast.binaryOperation(
        value as Ast.BinaryOperation['operator'],
        result,
        right,
        { start, end: stream.peek().end }
      )
    }
    return result
  }

  function parseCallOrFactor (): Ast.Expression {
    const { start } = stream.peek()
    let result = parseFactor()
    while (at(TokenType.PAREN_OPEN)) {
      expect(TokenType.PAREN_OPEN)
      const parameters: Ast.Expression[] = []
      while (!at(TokenType.PAREN_CLOSE)) {
        parameters.push(parseExpression())
        if (!at(TokenType.COMMA)) {
          break
        }
        expect(TokenType.COMMA)
      }
      const { end } = expect(TokenType.PAREN_CLOSE)
      result = Ast.functionCall(
        result,
        parameters,
        { start, end }
      )
    }
    return result
  }

  function parseFactor () {
    if (at(TokenType.PAREN_OPEN)) {
      stream.next()
      const expression = parseExpression()
      expect(TokenType.PAREN_CLOSE)
      return expression
    }
    return parseLiteral()
  }

  function parseLiteral () {
    if (at(TokenType.NUMBER)) {
      return parseNumberLiteral()
    }

    if (at(TokenType.BOOLEAN)) {
      return parseBooleanLiteral()
    }

    if (at(TokenType.IDENTIFIER)) {
      return parseIdentifier()
    }

    return fail()
  }

  function parseNumberLiteral () {
    const { start, end, value } = stream.next()
    return Ast.numberLiteral(value, { start, end })
  }

  function parseBooleanLiteral () {
    const { start, end, value } = stream.next()
    return Ast.booleanLiteral(value === 'true', { start, end })
  }

  function parseIdentifier () {
    const { start, end, value } = expect(TokenType.IDENTIFIER)
    return Ast.identifier(value, { start, end })
  }
}
