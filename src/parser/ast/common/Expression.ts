import { BinaryOperation } from '../expressions/BinaryOperation'
import { BooleanLiteral } from '../literals/BooleanLiteral'
import { FunctionCall } from '../expressions/FunctionCall'
import { Identifier } from '../expressions/Identifier'
import { IndexAccess } from '../expressions/IndexAccess'
import { MemberAccess } from '../expressions/MemberAccess'
import { NumberLiteral } from '../literals/NumberLiteral'
import { StringLiteral } from '../literals/StringLiteral'
import { ZeroLiteral } from '../literals/ZeroLiteral'

export type Expression
  = BinaryOperation
  | BooleanLiteral
  | FunctionCall
  | Identifier
  | IndexAccess
  | MemberAccess
  | NumberLiteral
  | StringLiteral
  | ZeroLiteral
