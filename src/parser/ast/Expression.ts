import { BinaryOperation } from './BinaryOperation'
import { BooleanLiteral } from './BooleanLiteral'
import { FunctionCall } from './FunctionCall'
import { Identifier } from './Identifier'
import { IndexAccess } from './IndexAccess'
import { NumberLiteral } from './NumberLiteral'
import { StringLiteral } from './StringLiteral'
import { ZeroLiteral } from './ZeroLiteral'

export type Expression
  = BinaryOperation
  | BooleanLiteral
  | FunctionCall
  | Identifier
  | IndexAccess
  | NumberLiteral
  | StringLiteral
  | ZeroLiteral
