import { MethodDeclaration } from './MethodDeclaration'
import { UsingDeclaration } from './UsingDeclaration'
import { FieldDeclaration } from './FieldDeclaration'

export type MemberDeclaration
  = FieldDeclaration
  | UsingDeclaration
  | MethodDeclaration
