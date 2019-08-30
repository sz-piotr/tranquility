import { Environment } from './Environment'
import { parse } from '../parser/parse'
import * as Ast from '../parser/ast'
import { Error, report } from '../errors'

export class Interpreter {
  private environment = new Environment()

  eval (source: string) {
    const { ast, errors } = parse(source)
    if (errors.length > 0) {
      this.report(errors, source)
    } else {
      try {
        return this.evalNode(ast)
      } catch (e) {
        console.error(e)
      }
    }
  }

  private report (errors: Error[], source: string) {
    for (const error of errors) {
      console.error(report(error, source))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private evalNode (node: Ast.AstNode): any {
    switch (node.kind) {
      case 'Program': return this.evalProgram(node)
      case 'BinaryOperation': return this.evalBinaryOperation(node)
      case 'NumberLiteral': return this.evalNumberLiteral(node)
      case 'BooleanLiteral': return this.evalBooleanLiteral(node)
      case 'VariableDeclaration': return this.evalVariableDeclaration(node)
      case 'VariableAssignment': return this.evalVariableAssignment(node)
      case 'Identifier': return this.evalIdentifier(node)
      default: throw new TypeError('Unsupported node kind')
    }
  }

  private evalProgram (node: Ast.Program) {
    let result
    for (const child of node.children) {
      result = this.evalNode(child)
    }
    return result
  }

  private evalVariableDeclaration (node: Ast.VariableDeclaration) {
    this.environment.define(
      node.identifier.value,
      this.evalNode(node.value)
    )
  }

  private evalVariableAssignment (node: Ast.VariableAssignment) {
    if (node.left.kind !== 'Identifier') {
      throw new TypeError('Invalid assignment target')
    }
    this.environment.assign(
      node.left.value,
      this.evalNode(node.right)
    )
  }

  private evalBinaryOperation (node: Ast.BinaryOperation) {
    const operator = node.operator
    const left = this.evalNode(node.left)
    const right = this.evalNode(node.right)
    switch (operator) {
      case Ast.Operator.ADD: return left + right
      case Ast.Operator.SUBTRACT: return left - right
      case Ast.Operator.MULTIPLY: return left * right
      case Ast.Operator.DIVIDE: return left / right
    }
  }

  private evalNumberLiteral (node: Ast.NumberLiteral) {
    return Number.parseFloat(node.value)
  }

  private evalBooleanLiteral (node: Ast.BooleanLiteral) {
    return node.value
  }

  private evalIdentifier (node: Ast.Identifier) {
    return this.environment.get(node.value)
  }
}
