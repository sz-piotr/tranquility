import { Location } from './location'

export interface Token {
  readonly kind: TokenKind,
  readonly value: string,
  readonly start: Location,
  readonly end: Location
}

export enum TokenKind {
  PAREN_OPEN, // (
  PAREN_CLOSE, // )
  BRACKET_OPEN, // [
  BRACKET_CLOSE, // ]
  CURLY_OPEN, // {
  CURLY_CLOSE, // }

  COMMA, // ,
  DOT, // .
  QUESTION, // ?
  TILDE, // ~
  HASH, // #
  SEMICOLON, // ;

  COLON, // :
  COLON_EQUALS, // :=

  EQUALS, // =
  EQUALS_EQUALS, // ==
  EQUALS_EQUALS_EQUALS, // ===
  EQUALS_RIGHT, // =>

  BANG, // !
  BANG_EQUALS, // !=
  BANG_EQUALS_EQUALS, // !==

  MINUS, // -
  MINUS_MINUS, // --
  MINUS_EQUALS, // -=
  MINUS_RIGHT, // ->

  PLUS, // +
  PLUS_PLUS, // ++
  PLUS_EQUALS, // +=

  STAR, // *
  STAR_STAR, // **
  STAR_EQUALS, // *=

  SLASH, // /
  SLASH_EQUALS, // /=

  PERCENT, // %
  PERCENT_EQUALS, // %=

  CARET, // ^
  CARET_EQUALS, // ^=

  AMPERSAND, // &
  AMPERSAND_AMPERSAND, // &&
  AMPERSAND_EQUALS, // &=

  BAR, // |
  BAR_BAR, // ||
  BAR_EQUALS, // |=

  RIGHT, // >
  RIGHT_RIGHT, // >>
  RIGHT_EQUALS, // >=

  LEFT, // <
  LEFT_LEFT, // <<
  LEFT_EQUALS, // <=
  LEFT_RIGHT, // <>

  FUNCTION,
  EVENT,
  STORAGE,
  CONTRACT,
  LET,
  USE,
  FOR,
  WHILE,
  IF,
  ELSE,
  ZERO,
  RETURN,

  NUMBER,
  BOOLEAN,

  SINGLE_QUOTE, // '
  DOUBLE_QUOTE, // "
  STRING_CONTENT,
  STRING_INVALID_CHAR,
  STRING_INVALID_ESCAPE,
  STRING_END,

  IDENTIFIER,

  EOF,
  UNRECOGNIZED
}
