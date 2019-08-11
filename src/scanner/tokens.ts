export interface Token {
  readonly type: TokenType,
  readonly value: string,
  readonly start: Location,
  readonly end: Location
}

export enum TokenType {
  PAREN_LEFT, // (
  PAREN_RIGHT, // )
  BRACKET_LEFT, // [
  BRACKET_RIGHT, // ]
  CURLY_LEFT, // {
  CURLY_RIGHT, // }

  COMMA, // ,
  DOT, // .
  QUESTION, // ?
  TILDE, // ~
  SEMICOLON, // ;

  COLON, // :
  COLON_EQUAL, // :=

  EQUAL, // =
  EQUAL_EQUAL, // ==
  EQUAL_EQUAL_EQUAL, // ===
  EQUAL_RIGHT, // =>

  MINUS, // -
  MINUS_MINUS, // --
  MINUS_EQUAL, // -=
  MINUS_RIGHT, // ->

  PLUS, // +
  PLUS_PLUS, // ++
  PLUS_EQUAL, // +=

  STAR, // *
  STAR_STAR, // **
  STAR_EQUAL, // *=

  SLASH, // /
  SLASH_EQUAL, // /=

  PERCENT, // %
  PERCENT_EQUAL, // %=

  CARET, // ^
  CARET_EQUAL, // ^=

  HASH, // #

  AMPERSAND, // &
  AMPERSAND_AMPERSAND, // &&
  AMPERSAND_EQUAL, // &=

  BAR, // |
  BAR_BAR, // ||
  BAR_EQUAL, // |=

  BANG, // !
  BANG_EQUAL, // !=
  BANG_EQUAL_EQUAL, // !==

  RIGHT, // >
  RIGHT_RIGHT, // >>
  RIGHT_EQUAL, // >=

  LEFT, // <
  LEFT_LEFT, // <<
  LEFT_EQUAL, // <=

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
