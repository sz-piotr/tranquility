import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'

export function math () {
  it('math', () => {
    const source = '1 + 2 * (5 - 2)'
    const interpreter = new Interpreter()
    expect(interpreter.eval(source)).to.equal(7)
  })
}
