import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetAstSpans } from '../utils'

export function storage () {
  it.skip('storage', () => {
    const result = parse(`
      storage Token {
        balances: Map(Address, Uint)
        supply: Uint

        use balances.get as balanceOf

        totalSupply (): Uint {
          return supply
        }

        burn (address: Address, amount: Uint) {
          check(address != zero)
          check(amount != 0)

          balances[address] -= amount -> 'Insufficient funds'
          supply -= amount

          emit Transfer(address, zero, amount)
        }
      }
    `)

    const expected = new Ast.Program([
      new Ast.StorageDeclaration([

        new Ast.FieldDeclaration(
          new Ast.Identifier('balances'),
          new Ast.Type(
            new Ast.Identifier('Map'),
            [
              new Ast.Type(new Ast.Identifier('Address'), []),
              new Ast.Type(new Ast.Identifier('Uint'), [])
            ]
          )
        ),

        new Ast.FieldDeclaration(
          new Ast.Identifier('supply'),
          new Ast.Type(new Ast.Identifier('Uint'), [])
        ),

        new Ast.UsingDeclaration(
          new Ast.Identifier('balances'),
          new Ast.Identifier('get'),
          new Ast.Identifier('balanceOf')
        ),

        new Ast.MethodDeclaration(
          new Ast.Identifier('totalSupply'),
          [],
          new Ast.Type(new Ast.Identifier('Uint'), []),
          [
            new Ast.ReturnStatement(
              new Ast.Identifier('supply')
            )
          ]
        ),

        new Ast.MethodDeclaration(
          new Ast.Identifier('burn'),
          [
            new Ast.FunctionParameter(
              new Ast.Identifier('address'),
              new Ast.Type(new Ast.Identifier('Address'), [])
            ),
            new Ast.FunctionParameter(
              new Ast.Identifier('amount'),
              new Ast.Type(new Ast.Identifier('Uint'), [])
            )
          ],
          undefined,
          [
            new Ast.FunctionCall(
              new Ast.Identifier('check'),
              [
                new Ast.BinaryOperation(
                  Ast.BinaryOperator.NOT_EQUAL,
                  new Ast.Identifier('address'),
                  new Ast.ZeroLiteral()
                )
              ]
            ),
            new Ast.FunctionCall(
              new Ast.Identifier('check'),
              [
                new Ast.BinaryOperation(
                  Ast.BinaryOperator.NOT_EQUAL,
                  new Ast.Identifier('amount'),
                  new Ast.NumberLiteral('0')
                )
              ]
            ),
            new Ast.StatementWithError(
              new Ast.VariableAssignment(
                Ast.AssignmentOperator.SUBTRACT,
                new Ast.IndexAccess(
                  new Ast.Identifier('balances'),
                  new Ast.Identifier('address')
                ),
                new Ast.Identifier('value')
              ),
              new Ast.StringLiteral('Insufficient funds')
            ),
            new Ast.VariableAssignment(
              Ast.AssignmentOperator.SUBTRACT,
              new Ast.Identifier('supply'),
              new Ast.Identifier('amount')
            ),
            new Ast.EventEmit(
              new Ast.Identifier('Transfer'),
              [
                new Ast.Identifier('address'),
                new Ast.ZeroLiteral(),
                new Ast.Identifier('amount')
              ]
            )
          ]
        )
      ])
    ])

    expect(resetAstSpans(result.ast)).to.deep.equal(expected)
  })
}
