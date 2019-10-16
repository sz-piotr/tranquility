import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'
import { Nothing } from '../../../src/model'

export function empty () {
  it('empty', () => {
    const source = ''
    const interpreter = new Interpreter()
    expect(interpreter.eval(source)).to.equal(Nothing)
  })
}
