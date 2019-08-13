import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'

export function globals () {
  it('globals', () => {
    const source = `
      let a = 100
      let b = 200
      let c = a + b
      c
    `
    const interpreter = new Interpreter()
    expect(interpreter.eval(source)).to.equal(300)
  })
}
