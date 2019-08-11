export interface Token {
  readonly type: TokenType,
  readonly value: string,
  readonly start: Location,
  readonly end: Location
}

export enum TokenType {
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
  SEMICOLON, // ;

  COLON, // :
  COLON_EQUALS, // :=

  EQUALS, // =
  EQUALS_EQUALS, // ==
  EQUALS_EQUALS_EQUALS, // ===
  EQUALS_RIGHT, // =>

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

  HASH, // #

  AMPERSAND, // &
  AMPERSAND_AMPERSAND, // &&
  AMPERSAND_EQUALS, // &=

  BAR, // |
  BAR_BAR, // ||
  BAR_EQUALS, // |=

  BANG, // !
  BANG_EQUALS, // !=
  BANG_EQUALS_EQUALS, // !==

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
  RETURN,

  NUMBER,
  BOOLEAN,
  STRING,

  IDENTIFIER,

  EOF
}

export interface Location {
  readonly position: number
  readonly line: number
  readonly column: number
}
