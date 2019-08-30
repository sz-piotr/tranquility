import { Scanner } from './Scanner'
import { TokenKind, Token } from './tokens'
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

  function at (kind: TokenKind) {
    const token = stream.peek()
    return token.kind === kind
  }

  function expect (kind: TokenKind) {
    if (at(kind)) {
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

    while (!at(TokenKind.EOF)) {
      try {
        children.push(parseStatement())
      } catch (e) {
        handleError(e)
      }
    }
    expect(TokenKind.EOF)

    return {
      ast: Ast.program(children, { start, end: stream.peek().end }),
      errors
    }
  }

  function handleError (e: unknown) {
    if (e instanceof UnexpectedToken) {
      const token = e.token
      if (token.kind === TokenKind.UNRECOGNIZED) {
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
      switch (stream.next().kind) {
        case TokenKind.EOF:
        case TokenKind.EVENT:
        case TokenKind.FUNCTION:
        case TokenKind.STORAGE:
        case TokenKind.CONTRACT:
        case TokenKind.LET:
        case TokenKind.IF:
        case TokenKind.FOR:
        case TokenKind.WHILE:
        case TokenKind.RETURN:
          return
      }
    }
  }

  function parseStatement () {
    if (at(TokenKind.LET)) {
      return parseVariableDeclaration()
    }
    if (at(TokenKind.FUNCTION)) {
      return parseFunctionDefinition()
    }
    return parseAssignmentOrExpression()
  }

  function parseVariableDeclaration () {
    const { start } = expect(TokenKind.LET)
    const identifier = parseIdentifier()
    expect(TokenKind.EQUALS)
    const value = parseExpression()
    return Ast.variableDeclaration(identifier, value, { start, end: value.span.end })
  }

  function parseFunctionDefinition () {
    const { start } = expect(TokenKind.FUNCTION)
    const identifier = parseIdentifier()

    expect(TokenKind.PAREN_OPEN)
    const parameters = parseFunctionParameters()
    expect(TokenKind.PAREN_CLOSE)

    expect(TokenKind.CURLY_OPEN)
    const body = parseFunctionBody()
    const { end } = expect(TokenKind.CURLY_CLOSE)

    return Ast.functionDeclaration(identifier, parameters, body, { start, end })
  }

  function parseFunctionParameters () {
    const parameters: Ast.Identifier[] = []
    while (at(TokenKind.IDENTIFIER)) {
      parameters.push(parseIdentifier())
      if (!at(TokenKind.COMMA)) {
        break
      }
      expect(TokenKind.COMMA)
    }
    return parameters
  }

  function parseFunctionBody () {
    const body: Ast.Statement[] = []
    while (!at(TokenKind.CURLY_CLOSE)) {
      body.push(parseStatement())
    }
    return body
  }

  function parseAssignmentOrExpression () {
    const left = parseExpression()
    if (at(TokenKind.EQUALS)) {
      stream.next()
      const right = parseExpression()
      return Ast.variableAssignment(
        left,
        right,
        { start: left.span.start, end: right.span.end }
      )
    }
    return left
  }

  function parseExpression (): Ast.Expression {
    const { start } = stream.peek()
    let result: Ast.Expression = parseTerm()
    while (at(TokenKind.PLUS) || at(TokenKind.MINUS)) {
      const { kind } = stream.next()
      const right = parseTerm()
      result = Ast.binaryOperation(
        getOperator(kind),
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
    while (at(TokenKind.STAR) || at(TokenKind.SLASH)) {
      const { kind } = stream.next()
      const right = parseCallOrFactor()
      result = Ast.binaryOperation(
        getOperator(kind),
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
    while (at(TokenKind.PAREN_OPEN)) {
      expect(TokenKind.PAREN_OPEN)
      const parameters: Ast.Expression[] = []
      while (!at(TokenKind.PAREN_CLOSE)) {
        parameters.push(parseExpression())
        if (!at(TokenKind.COMMA)) {
          break
        }
        expect(TokenKind.COMMA)
      }
      const { end } = expect(TokenKind.PAREN_CLOSE)
      result = Ast.functionCall(
        result,
        parameters,
        { start, end }
      )
    }
    return result
  }

  function parseFactor () {
    if (at(TokenKind.PAREN_OPEN)) {
      stream.next()
      const expression = parseExpression()
      expect(TokenKind.PAREN_CLOSE)
      return expression
    }
    return parseLiteral()
  }

  function parseLiteral () {
    if (at(TokenKind.NUMBER)) {
      return parseNumberLiteral()
    }

    if (at(TokenKind.BOOLEAN)) {
      return parseBooleanLiteral()
    }

    if (at(TokenKind.IDENTIFIER)) {
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
    const { start, end, value } = expect(TokenKind.IDENTIFIER)
    return Ast.identifier(value, { start, end })
  }
}

function getOperator (kind: TokenKind): Ast.Operator {
  switch (kind) {
    case TokenKind.PLUS: return Ast.Operator.ADD
    case TokenKind.MINUS: return Ast.Operator.SUBTRACT
    case TokenKind.STAR: return Ast.Operator.MULTIPLY
    case TokenKind.SLASH: return Ast.Operator.DIVIDE
    case TokenKind.EQUALS_EQUALS: return Ast.Operator.EQUAL
    case TokenKind.BANG_EQUALS: return Ast.Operator.NOT_EQUAL
    case TokenKind.LEFT: return Ast.Operator.LESS
    case TokenKind.LEFT_EQUALS: return Ast.Operator.LESS_OR_EQUAL
    case TokenKind.RIGHT: return Ast.Operator.GREATER
    case TokenKind.RIGHT_EQUALS: return Ast.Operator.GREATER_OR_EQUAL
  }
  throw new TypeError('Invalid operator')
}
