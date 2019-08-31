import { variableDeclaration } from './parse_cases/variableDeclaration'
import { basicMath } from './parse_cases/basicMath'
import { smallProgram } from './parse_cases/smallProgram'
import { emptyProgram } from './parse_cases/emptyProgram'
import { functionCalls } from './parse_cases/functionCalls'
import { newlines } from './parse_cases/newlines'
import { errorInvalidCharacter } from './parse_cases/errorInvalidCharacter'
import { assignment } from './parse_cases/assignment'
import { storage } from './parse_cases/storage'
import { nodes } from './parse_cases/nodes'

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
