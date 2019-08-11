import { expect } from 'chai'
import { Scanner } from '../../../src/scanner/Scanner'
import { token } from '../utils'
import { TokenType } from '../../../src/scanner/tokens'

export function operators () {
  it('operators', () => {
    const source =
      '()[]{} ' +
      ',.?~; ' +
      ': := ' +
      '= == === => ' +
      '- -- -= ->'
    const tokens = Scanner.tokenize(source)

    expect(tokens).to.deep.equal([
      token(TokenType.PAREN_OPEN, '(', 0),
      token(TokenType.PAREN_CLOSE, ')', 1),
      token(TokenType.BRACKET_OPEN, '[', 2),
      token(TokenType.BRACKET_CLOSE, ']', 3),
      token(TokenType.CURLY_OPEN, '{', 4),
      token(TokenType.CURLY_CLOSE, '}', 5),

      token(TokenType.COMMA, ',', 7),
      token(TokenType.DOT, '.', 8),
      token(TokenType.QUESTION, '?', 9),
      token(TokenType.TILDE, '~', 10),
      token(TokenType.SEMICOLON, ';', 11),

      token(TokenType.COLON, ':', 13),
      token(TokenType.COLON_EQUALS, ':=', 15),

      token(TokenType.EQUALS, '=', 18),
      token(TokenType.EQUALS_EQUALS, '==', 20),
      token(TokenType.EQUALS_EQUALS_EQUALS, '===', 23),
      token(TokenType.EQUALS_RIGHT, '=>', 27),

      token(TokenType.MINUS, '-', 30),
      token(TokenType.MINUS_MINUS, '--', 32),
      token(TokenType.MINUS_EQUALS, '-=', 35),
      token(TokenType.MINUS_RIGHT, '->', 38),

      token(TokenType.EOF, '', 40),
    ])
  })
}
