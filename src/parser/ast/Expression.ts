import { NumberLiteral } from './NumberLiteral'
import { BooleanLiteral } from './BooleanLiteral'
import { BinaryOperation } from './BinaryOperation'
import { FunctionCall } from './FunctionCall'
import { Identifier } from './Identifier'

export type Expression
  = NumberLiteral
  | BooleanLiteral
  | BinaryOperation
  | FunctionCall
  | Identifier
