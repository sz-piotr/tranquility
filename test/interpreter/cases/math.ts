import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'
import { NumberValue } from '../../../src/model'

export function math () {
  it('math', () => {
    const source = '1 + 2 * (5 - 2)'
    const interpreter = new Interpreter()
    expect(interpreter.eval(source)).to.deep.equal(new NumberValue(7))
  })
}
