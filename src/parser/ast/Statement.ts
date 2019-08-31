import { Expression } from './Expression'
import { ReturnStatement } from './ReturnStatement'
import { StorageDeclaration } from './StorageDeclaration'
import { FunctionDeclaration } from './FunctionDeclaration'
import { VariableAssignment } from './VariableAssignment'
import { VariableDeclaration } from './VariableDeclaration'
import { StatementWithError } from './StatementWithError'

export type Statement
  = VariableDeclaration
  | VariableAssignment
  | FunctionDeclaration
  | StorageDeclaration
  | ReturnStatement
  | Expression
  | StatementWithError

