import { parse } from '../parser/parse'
import { report } from '../errors'

export function run (source: string) {
  const result = parse(source)
  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(report(error, source) + '\n')
    }
  } else {
    console.log(result.ast)
  }
}
