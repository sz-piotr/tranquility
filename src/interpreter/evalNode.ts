import { AstNode } from '../parser/ast'
import { evalProgram } from './evalProgram'
import { Environment } from './Environment'
import { evalBinaryOperation } from './evalBinaryOperation'
import { evalBooleanLiteral } from './evalBooleanLiteral'
import { evalIdentifier } from './evalIdentifier'
import { evalNumberLiteral } from './evalNumberLiteral'
import { evalVariableAssignment } from './evalVariableAssignment'
import { evalVariableDeclaration } from './evalVariableDeclaration'

export function evalNode (
  node: AstNode,
  environment: Environment
): any {
  switch (node.kind) {
    case 'Program': return evalProgram(node, environment)
    case 'BinaryOperation': return evalBinaryOperation(node, environment)
    case 'NumberLiteral': return evalNumberLiteral(node)
    case 'BooleanLiteral': return evalBooleanLiteral(node)
    case 'VariableDeclaration': return evalVariableDeclaration(node, environment)
    case 'VariableAssignment': return evalVariableAssignment(node, environment)
    case 'Identifier': return evalIdentifier(node, environment)
    default: throw new TypeError('Unsupported node kind')
  }
}
