import { readFileSync } from 'fs'
import { createInterface } from 'readline'
import { Interpreter } from './interpreter/Interpreter'

main(process.argv.slice(2))

function main (args: string[]) {
  if (args.length > 1) {
    console.log('Usage: yarn start [script]')
    process.exit(64)
  } else if (args.length === 1) {
    runFile(args[0])
  } else {
    runPrompt()
  }
}

function runFile (fileName: string) {
  const source = readFileSync(fileName, 'utf-8')
  return new Interpreter().eval(source)
}

const FORMAT_GREEN = '\x1b[32m%s\x1b[0m'

function runPrompt () {
  const interpreter = new Interpreter()
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  console.log('Welcome. Type "exit" or use ^C to exit.')
  rl.prompt()
  rl.on('line', (source) => {
    if (source === 'exit') {
      rl.close()
      return
    }

    const result = interpreter.eval(source)
    console.log(FORMAT_GREEN, result.toPrint())

    rl.prompt()
  }).on('close', () => {
    console.log('Bye!')
  })
}
