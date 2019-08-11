import { expect } from 'chai'
import { Scanner } from '../../../src/scanner/Scanner'
import { TokenType } from '../../../src/scanner/tokens'
import { token } from '../utils'

export function operators () {
  it('operators', () => {
    const operators: [TokenType, string][] = [
      [TokenType.PAREN_OPEN, '('],
      [TokenType.PAREN_CLOSE, ')'],
      [TokenType.BRACKET_OPEN, '['],
      [TokenType.BRACKET_CLOSE, ']'],
      [TokenType.CURLY_OPEN, '{'],
      [TokenType.CURLY_CLOSE, '}'],

      [TokenType.COMMA, ','],
      [TokenType.DOT, '.'],
      [TokenType.QUESTION, '?'],
      [TokenType.TILDE, '~'],
      [TokenType.HASH, '#'],
      [TokenType.SEMICOLON, ';'],

      [TokenType.COLON, ':'],
      [TokenType.COLON_EQUALS, ':='],

      [TokenType.EQUALS, '='],
      [TokenType.EQUALS_EQUALS, '=='],
      [TokenType.EQUALS_EQUALS_EQUALS, '==='],
      [TokenType.EQUALS_RIGHT, '=>'],

      [TokenType.BANG, '!'],
      [TokenType.BANG_EQUALS, '!='],
      [TokenType.BANG_EQUALS_EQUALS, '!=='],

      [TokenType.MINUS, '-'],
      [TokenType.MINUS_MINUS, '--'],
      [TokenType.MINUS_EQUALS, '-='],
      [TokenType.MINUS_RIGHT, '->'],

      [TokenType.PLUS, '+'],
      [TokenType.PLUS_PLUS, '++'],
      [TokenType.PLUS_EQUALS, '+='],

      [TokenType.STAR, '*'],
      [TokenType.STAR_STAR, '**'],
      [TokenType.STAR_EQUALS, '*='],

      [TokenType.SLASH, '/'],
      [TokenType.SLASH_EQUALS, '/='],

      [TokenType.PERCENT, '%'],
      [TokenType.PERCENT_EQUALS, '%='],

      [TokenType.CARET, '^'],
      [TokenType.CARET_EQUALS, '^='],

      [TokenType.AMPERSAND, '&'],
      [TokenType.AMPERSAND_AMPERSAND, '&&'],
      [TokenType.AMPERSAND_EQUALS, '&='],

      [TokenType.BAR, '|'],
      [TokenType.BAR_BAR, '||'],
      [TokenType.BAR_EQUALS, '|='],

      [TokenType.RIGHT, '>'],
      [TokenType.RIGHT_RIGHT, '>>'],
      [TokenType.RIGHT_EQUALS, '>='],

      [TokenType.LEFT, '<'],
      [TokenType.LEFT_LEFT, '<<'],
      [TokenType.LEFT_EQUALS, '<='],
      [TokenType.LEFT_RIGHT, '<>'],
    ]

    const source = operators.map(([type, value]) => value).join(' ')
    const tokens = Scanner.tokenize(source)

    let i = 0
    let last = 0

    function t (type: TokenType, value: string) {
      i += last
      last = value.length + 1
      return token(type, value, i)
    }

    expect(tokens).to.deep.equal([
      ...operators.map(([type, value]) => t(type, value)),
      token(TokenType.EOF, '', source.length)
    ])
  })
}
