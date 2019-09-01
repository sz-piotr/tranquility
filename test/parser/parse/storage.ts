import { expect } from 'chai'
import { parse } from '../../../src/parser/parse'
import * as Ast from '../../../src/parser/ast'
import { resetRanges } from '../utils'

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

    const expected = Ast.program([
      Ast.storageDeclaration([

        Ast.fieldDeclaration(
          Ast.identifier('balances'),
          Ast.type(
            Ast.identifier('Map'),
            [
              Ast.type(Ast.identifier('Address'), []),
              Ast.type(Ast.identifier('Uint'), [])
            ]
          )
        ),

        Ast.fieldDeclaration(
          Ast.identifier('supply'),
          Ast.type(Ast.identifier('Uint'), [])
        ),

        Ast.usingDeclaration(
          Ast.identifier('balances'),
          Ast.identifier('get'),
          Ast.identifier('balanceOf')
        ),

        Ast.methodDeclaration(
          Ast.identifier('totalSupply'),
          [],
          Ast.type(Ast.identifier('Uint'), []),
          [
            Ast.returnStatement(
              Ast.identifier('supply')
            )
          ]
        ),

        Ast.methodDeclaration(
          Ast.identifier('burn'),
          [
            Ast.functionParameter(
              Ast.identifier('address'),
              Ast.type(Ast.identifier('Address'), [])
            ),
            Ast.functionParameter(
              Ast.identifier('amount'),
              Ast.type(Ast.identifier('Uint'), [])
            )
          ],
          undefined,
          [
            Ast.functionCall(
              Ast.identifier('check'),
              [
                Ast.binaryOperation(
                  Ast.BinaryOperator.NOT_EQUAL,
                  Ast.identifier('address'),
                  Ast.zeroLiteral()
                )
              ]
            ),
            Ast.functionCall(
              Ast.identifier('check'),
              [
                Ast.binaryOperation(
                  Ast.BinaryOperator.NOT_EQUAL,
                  Ast.identifier('amount'),
                  Ast.numberLiteral('0')
                )
              ]
            ),
            Ast.statementWithError(
              Ast.variableAssignment(
                Ast.AssignmentOperator.SUBTRACT,
                Ast.indexAccess(
                  Ast.identifier('balances'),
                  Ast.identifier('address'),
                ),
                Ast.identifier('value'),
              ),
              Ast.stringLiteral('Insufficient funds')
            ),
            Ast.variableAssignment(
              Ast.AssignmentOperator.SUBTRACT,
              Ast.identifier('supply'),
              Ast.identifier('amount')
            ),
            Ast.eventEmit(
              Ast.identifier('Transfer'),
              [
                Ast.identifier('address'),
                Ast.zeroLiteral(),
                Ast.identifier('amount')
              ]
            )
          ]
        )
      ])
    ])

    expect(resetRanges(result.ast)).to.deep.equal(expected)
  })
}
