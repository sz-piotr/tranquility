import { BinaryOperation } from '../expressions/BinaryOperation'
import { FunctionCall } from '../expressions/FunctionCall'
import { IndexAccess } from '../expressions/IndexAccess'
import { Identifier } from '../expressions/Identifier'
import { BooleanLiteral } from '../literals/BooleanLiteral'
import { NumberLiteral } from '../literals/NumberLiteral'
import { StringLiteral } from '../literals/StringLiteral'
import { ZeroLiteral } from '../literals/ZeroLiteral'

export type Expression
  = BinaryOperation
  | FunctionCall
  | IndexAccess
  | Identifier
  | BooleanLiteral
  | NumberLiteral
  | StringLiteral
  | ZeroLiteral
