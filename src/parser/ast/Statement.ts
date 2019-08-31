import { Expression } from './Expression'
import { ReturnStatement } from './ReturnStatement'
import { StorageDeclaration } from './StorageDeclaration'
import { FunctionDeclaration } from './FunctionDeclaration'
import { VariableAssignment } from './VariableAssignment'
import { VariableDeclaration } from './VariableDeclaration'
import { StatementWithError } from './StatementWithError'
import { EventEmit } from './EventEmit'

export type Statement
  = VariableDeclaration
  | VariableAssignment
  | FunctionDeclaration
  | StorageDeclaration
  | ReturnStatement
  | StatementWithError
  | EventEmit
  | Expression

