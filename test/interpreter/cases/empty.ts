import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'

export function empty () {
  it('empty', () => {
    const source = ''
    const interpreter = new Interpreter()
    expect(interpreter.eval(source)).to.equal(undefined)
  })
}
