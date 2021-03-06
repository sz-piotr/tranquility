import { expect } from 'chai'
import { parse } from '../../../../src/parser/parse'
import * as Ast from '../../../../src/parser/ast'
import * as Err from '../../../../src/errors'
import { resetAstSpans, resetErrorSpans } from '../../utils'

export function stringLiteral () {
  it('stringLiteral', () => {
    const result = parse(`
      ""
      "value"
      "a b c"
      "a \\"bc\\""
      "I can't believe it!"

      'Single quote'
      "Unterminated
      'Single quote unterminated
      "Escape at newline \\
      "Invalid escape \\a xd"
    `)

    const expected = new Ast.Program([
      new Ast.StringLiteral(''),
      new Ast.StringLiteral('value'),
      new Ast.StringLiteral('a b c'),
      new Ast.StringLiteral('a "bc"'),
      new Ast.StringLiteral('I can\'t believe it!'),
      new Ast.StringLiteral('Single quote'),
      new Ast.StringLiteral('Unterminated'),
      new Ast.StringLiteral('Single quote unterminated'),
      new Ast.StringLiteral('Escape at newline '),
      new Ast.StringLiteral('Invalid escape  xd')
    ])

    const errors = [
      new Err.SingleQuoteString(),
      new Err.UnterminatedString(),
      new Err.UnterminatedString(),
      new Err.InvalidStringEscape('\\'),
      new Err.UnterminatedString(),
      new Err.InvalidStringEscape('\\a')
    ]

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
    expect(resetErrorSpans(result.errors)).to.deep.equal(errors)
  })
}
