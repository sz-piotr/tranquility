import { NumberLiteral } from './NumberLiteral'
import { BooleanLiteral } from './BooleanLiteral'
import { StringLiteral } from './StringLiteral'
import { BinaryOperation } from './BinaryOperation'
import { FunctionCall } from './FunctionCall'
import { Identifier } from './Identifier'
import { IndexAccess } from './IndexAccess'

export type Expression
  = NumberLiteral
  | BooleanLiteral
  | StringLiteral
  | BinaryOperation
  | FunctionCall
  | Identifier
  | IndexAccess
