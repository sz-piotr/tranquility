import { BinaryOperation } from '../expressions/BinaryOperation'
import { BooleanLiteral } from '../literals/BooleanLiteral'
import { ExceptionExpression } from '../expressions/ExceptionExpression'
import { FunctionCall } from '../expressions/FunctionCall'
import { Identifier } from '../literals/Identifier'
import { IndexAccess } from '../expressions/IndexAccess'
import { MemberAccess } from '../expressions/MemberAccess'
import { NumberLiteral } from '../literals/NumberLiteral'
import { StringLiteral } from '../literals/StringLiteral'
import { UnaryOperation } from '../expressions/UnaryOperation'
import { ZeroLiteral } from '../literals/ZeroLiteral'

export type Expression
  = BinaryOperation
  | BooleanLiteral
  | ExceptionExpression
  | FunctionCall
  | Identifier
  | IndexAccess
  | MemberAccess
  | NumberLiteral
  | StringLiteral
  | UnaryOperation
  | ZeroLiteral
