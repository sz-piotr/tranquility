import { variableDeclaration } from './parse_cases/variableDeclaration'
import { basicMath } from './parse_cases/basicMath'
import { smallProgram } from './parse_cases/smallProgram'
import { emptyProgram } from './parse_cases/emptyProgram'
import { functionCalls } from './parse_cases/functionCalls'
import { newlines } from './parse_cases/newlines'
import { errorInvalidCharacter } from './parse_cases/errorInvalidCharacter'
import { literals } from './parse_cases/literals'
import { assignment } from './parse_cases/assignment'

describe('parse', () => {
  variableDeclaration()
  basicMath()
  smallProgram()
  emptyProgram()
  functionCalls()
  newlines()
  errorInvalidCharacter()
  literals()
  assignment()
})
