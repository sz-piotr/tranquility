import { variableDeclaration } from './cases/variableDeclaration'
import { basicMath } from './cases/basicMath'
import { smallProgram } from './cases/smallProgram'
import { emptyProgram } from './cases/emptyProgram'

describe('parse', () => {
  variableDeclaration()
  basicMath()
  smallProgram(),
  emptyProgram()
})
