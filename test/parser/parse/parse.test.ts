import { variableDeclaration } from './variableDeclaration'
import { basicMath } from './basicMath'
import { smallProgram } from './smallProgram'
import { emptyProgram } from './emptyProgram'
import { functionCalls } from './functionCalls'
import { newlines } from './newlines'
import { errorInvalidCharacter } from './errorInvalidCharacter'
import { assignment } from './assignment'
import { storage } from './storage'
import { nodes } from './nodes'

describe('parse', () => {
  nodes()
  variableDeclaration()
  basicMath()
  smallProgram()
  emptyProgram()
  functionCalls()
  newlines()
  errorInvalidCharacter()
  assignment()
  storage()
})
