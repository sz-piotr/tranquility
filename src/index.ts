import { readFileSync } from 'fs'
import { createInterface } from 'readline'
import { run } from './interpreter/run'

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
  return run(source)
}

function runPrompt () {
  const rl = createInterface({ input: process.stdin, output: process.stdout })

  console.log('Welcome. Type "exit" or use ^C to exit.')
  rl.prompt()
  rl.on('line', (source) => {
    if (source === 'exit') {
      rl.close()
      return
    }

    run(source)

    rl.prompt()
  }).on('close', () => {
    console.log('Bye!')
  })
}
