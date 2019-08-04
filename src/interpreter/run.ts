import { parse } from '../parser/parse'

export function run (source: string) {
  try {
    const ast = parse(source)
    console.log(ast)
  } catch (e) {
    console.error(e)
  }
}
