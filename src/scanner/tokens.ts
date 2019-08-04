export enum TokenType {
  LEFT_PAREN,
  RIGHT_PAREN,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  LEFT_BRACE,
  RIGHT_BRACE,

  COMMA,
  DOT,
  SEMICOLON,
  NEWLINE,

  MINUS,
  PLUS,
  STAR,
  SLASH,

  BANG,
  BANG_EQUAL,
  EQUAL,
  EQUAL_EQUAL,
  GREATER,
  GREATER_EQUAL,
  LESS,
  LESS_EQUAL,

  LET,
  FUNCTION,
  FOR,
  WHILE,
  IF,
  THEN,
  ELSE,
  TRUE,
  FALSE,

  IDENTIFIER,
  NUMBER,

  EOF
}

export interface Token {
  type: TokenType,
  value: string,
  start: number,
  end: number
}
