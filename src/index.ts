import { readFileSync } from 'fs'
import { run } from './interpreter/run'

main(process.argv.slice(2))

function main (args: string[]) {
  if (args.length !== 1) {
    console.log('Usage: yarn start [script]')
    process.exit(64)
  } else {
    runFile(args[0])
  }
}

function runFile (fileName: string) {
  const source = readFileSync(fileName, 'utf-8')
  return run(source)
}
