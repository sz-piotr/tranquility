import { Expression } from './Expression'
import { ReturnStatement } from '../statements/ReturnStatement'
import { StorageDeclaration } from '../statements/StorageDeclaration'
import { FunctionDeclaration } from '../statements/FunctionDeclaration'
import { VariableAssignment } from '../statements/VariableAssignment'
import { VariableDeclaration } from '../statements/VariableDeclaration'
import { StatementWithError } from '../statements/StatementWithError'
import { EventEmit } from '../statements/EventEmit'

export type Statement
  = VariableDeclaration
  | VariableAssignment
  | FunctionDeclaration
  | StorageDeclaration
  | ReturnStatement
  | StatementWithError
  | EventEmit
  | Expression
