import { AstNode } from '../parser/ast'
import { evalProgram } from './evalProgram'
import { Environment } from './Environment'
import { evalBinaryOperation } from './evalBinaryOperation'
import { evalBooleanLiteral } from './evalBooleanLiteral'
import { evalIdentifier } from './evalIdentifier'
import { evalNumberLiteral } from './evalNumberLiteral'
import { evalVariableAssignment } from './evalVariableAssignment'
import { evalVariableDeclaration } from './evalVariableDeclaration'
import { evalStringLiteral } from './evalStringLiteral'
import { ProgramValue } from '../model'

export function evalNode (
  node: AstNode,
  environment: Environment
): ProgramValue {
  switch (node.kind) {
    case 'Program': return evalProgram(node, environment)
    case 'BinaryOperation': return evalBinaryOperation(node, environment)
    case 'NumberLiteral': return evalNumberLiteral(node)
    case 'BooleanLiteral': return evalBooleanLiteral(node)
    case 'VariableDeclaration': return evalVariableDeclaration(node, environment)
    case 'VariableAssignment': return evalVariableAssignment(node, environment)
    case 'Identifier': return evalIdentifier(node, environment)
    case 'StringLiteral': return evalStringLiteral(node)
    default: throw new TypeError('Unsupported node kind')
  }
}
