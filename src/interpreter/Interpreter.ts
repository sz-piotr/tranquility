import { Environment } from './Environment'
import { parse } from '../parser/parse'
import { CompilationError, report } from '../errors'
import { evalNode } from './evalNode'

export class Interpreter {
  private environment = new Environment()

  eval (source: string) {
    const { ast, errors } = parse(source)
    if (errors.length > 0) {
      this.report(errors, source)
    } else {
      try {
        return evalNode(ast, this.environment)
      } catch (e) {
        console.error(e)
      }
    }
  }

  private report (errors: CompilationError[], source: string) {
    for (const error of errors) {
      console.error(report(error, source))
    }
  }
}
