import { expect } from 'chai'
import { Scanner } from '../../../src/parser/scanner/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token } from '../utils'

export function operators () {
  it('operators', () => {
    const operators: [TokenKind, string][] = [
      [TokenKind.PAREN_OPEN, '('],
      [TokenKind.PAREN_CLOSE, ')'],
      [TokenKind.BRACKET_OPEN, '['],
      [TokenKind.BRACKET_CLOSE, ']'],
      [TokenKind.CURLY_OPEN, '{'],
      [TokenKind.CURLY_CLOSE, '}'],

      [TokenKind.COMMA, ','],
      [TokenKind.DOT, '.'],
      [TokenKind.QUESTION, '?'],
      [TokenKind.TILDE, '~'],
      [TokenKind.HASH, '#'],
      [TokenKind.SEMICOLON, ';'],

      [TokenKind.COLON, ':'],
      [TokenKind.COLON_EQUALS, ':='],

      [TokenKind.EQUALS, '='],
      [TokenKind.EQUALS_EQUALS, '=='],
      [TokenKind.EQUALS_EQUALS_EQUALS, '==='],
      [TokenKind.EQUALS_RIGHT, '=>'],

      [TokenKind.BANG, '!'],
      [TokenKind.BANG_EQUALS, '!='],
      [TokenKind.BANG_EQUALS_EQUALS, '!=='],

      [TokenKind.MINUS, '-'],
      [TokenKind.MINUS_MINUS, '--'],
      [TokenKind.MINUS_EQUALS, '-='],
      [TokenKind.MINUS_RIGHT, '->'],

      [TokenKind.PLUS, '+'],
      [TokenKind.PLUS_PLUS, '++'],
      [TokenKind.PLUS_EQUALS, '+='],

      [TokenKind.STAR, '*'],
      [TokenKind.STAR_STAR, '**'],
      [TokenKind.STAR_EQUALS, '*='],

      [TokenKind.SLASH, '/'],
      [TokenKind.SLASH_EQUALS, '/='],

      [TokenKind.PERCENT, '%'],
      [TokenKind.PERCENT_EQUALS, '%='],

      [TokenKind.CARET, '^'],
      [TokenKind.CARET_EQUALS, '^='],

      [TokenKind.AMPERSAND, '&'],
      [TokenKind.AMPERSAND_AMPERSAND, '&&'],
      [TokenKind.AMPERSAND_EQUALS, '&='],

      [TokenKind.BAR, '|'],
      [TokenKind.BAR_BAR, '||'],
      [TokenKind.BAR_EQUALS, '|='],

      [TokenKind.RIGHT, '>'],
      [TokenKind.RIGHT_RIGHT, '>>'],
      [TokenKind.RIGHT_EQUALS, '>='],

      [TokenKind.LEFT, '<'],
      [TokenKind.LEFT_LEFT, '<<'],
      [TokenKind.LEFT_EQUALS, '<='],
      [TokenKind.LEFT_RIGHT, '<>']
    ]

    const source = operators.map(([, value]) => value).join(' ')
    const tokens = Scanner.scan(source)

    let i = 0
    let last = 0

    function t (kind: TokenKind, value: string) {
      i += last
      last = value.length + 1
      return token(kind, value, i)
    }

    expect(tokens).to.deep.equal([
      ...operators.map(([kind, value]) => t(kind, value)),
      token(TokenKind.EOF, '', source.length)
    ])
  })
}
