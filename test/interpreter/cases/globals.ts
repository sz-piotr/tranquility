import { expect } from 'chai'
import { Interpreter } from '../../../src/interpreter/Interpreter'
import { NumberValue } from '../../../src/model'

export function globals () {
  it('globals', () => {
    const source = `
      let a = 100
      let b = 200
      let c = a + b
      c = c + a
      c
    `
    const interpreter = new Interpreter()
    const result = interpreter.eval(source)
    expect(result).to.deep.equal(new NumberValue(400))
  })
}
