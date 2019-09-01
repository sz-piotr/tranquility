import { MethodDeclaration } from '../statements/MethodDeclaration'
import { UsingDeclaration } from '../statements/UsingDeclaration'
import { FieldDeclaration } from '../statements/FieldDeclaration'

export type MemberDeclaration
  = FieldDeclaration
  | UsingDeclaration
  | MethodDeclaration
