import { expect } from 'chai'
import { Scanner } from '../../../src/parser/scanner/Scanner'
import { TokenKind } from '../../../src/parser/tokens'
import { token, resetLocation } from '../utils'

export function strings () {
  it('strings', () => {
    const source = `
      "Hello World!"
      "Unterminated
      'Single'
      "\\n\\r\\t\\'\\"\\xFF\\\\"
      'before\\nafter'
      "ąę\x00\\z\\x4"
    `
    const tokens = Scanner.scan(source).map(resetLocation)

    expect(tokens).to.deep.equal([
      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_CONTENT, 'Hello World!'),
      token(TokenKind.DOUBLE_QUOTE, '"'),

      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_CONTENT, 'Unterminated'),

      token(TokenKind.SINGLE_QUOTE, '\''),
      token(TokenKind.STRING_CONTENT, 'Single'),
      token(TokenKind.SINGLE_QUOTE, '\''),

      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_ESCAPE_N, '\n'),
      token(TokenKind.STRING_ESCAPE_R, '\r'),
      token(TokenKind.STRING_ESCAPE_T, '\t'),
      token(TokenKind.STRING_ESCAPE_SINGLE_QUOTE, '\''),
      token(TokenKind.STRING_ESCAPE_DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_ESCAPE_BYTE, '\xFF'),
      token(TokenKind.STRING_ESCAPE_BACKSLASH, '\\'),
      token(TokenKind.DOUBLE_QUOTE, '"'),

      token(TokenKind.SINGLE_QUOTE, '\''),
      token(TokenKind.STRING_CONTENT, 'before'),
      token(TokenKind.STRING_ESCAPE_N, '\n'),
      token(TokenKind.STRING_CONTENT, 'after'),
      token(TokenKind.SINGLE_QUOTE, '\''),

      token(TokenKind.DOUBLE_QUOTE, '"'),
      token(TokenKind.STRING_INVALID_CHAR, 'ą'),
      token(TokenKind.STRING_INVALID_CHAR, 'ę'),
      token(TokenKind.STRING_INVALID_CHAR, '\x00'),
      token(TokenKind.STRING_INVALID_ESCAPE, '\\z'),
      token(TokenKind.STRING_INVALID_ESCAPE, '\\x4'),
      token(TokenKind.DOUBLE_QUOTE, '"'),

      token(TokenKind.EOF, '')
    ])
  })
}
