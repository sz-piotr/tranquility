import { booleanLiteral } from './booleanLiteral'
import { numberLiteral } from './numberLiteral'
import { stringLiteral } from './stringLiteral'
import { zeroLiteral } from './zeroLiteral'

export function nodes () {
  describe('nodes', () => {
    booleanLiteral()
    numberLiteral()
    stringLiteral()
    zeroLiteral()
  })
}
