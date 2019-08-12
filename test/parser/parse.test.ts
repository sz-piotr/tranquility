import { variableDeclaration } from './cases/variableDeclaration'
import { basicMath } from './cases/basicMath'
import { smallProgram } from './cases/smallProgram'
import { emptyProgram } from './cases/emptyProgram'
import { functionCalls } from './cases/functionCalls'
import { newlines } from './cases/newlines'

describe('parse', () => {
  variableDeclaration()
  basicMath()
  smallProgram()
  emptyProgram()
  functionCalls()
  newlines()
})
