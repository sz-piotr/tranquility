import { FunctionCall } from '../parser/ast'
import { Environment } from './Environment'
import { evalNode } from './evalNode'
import { Nothing } from '../model'

const FORMAT_BLUE = '\x1b[34m%s\x1b[0m'

export function evalFunctionCall (
  node: FunctionCall,
  environment: Environment
) {
  // TODO: add support for other functions
  if (node.callee.kind !== 'Identifier' || node.callee.value !== 'print') {
    throw new Error('Only print is supported!')
  }
  if (node.parameters.length !== 1) {
    throw new Error('Print accepts exactly 1 argument!')
  }
  const value = evalNode(node.parameters[0], environment)
  console.log(FORMAT_BLUE, value.toPrint())
  return Nothing
}
