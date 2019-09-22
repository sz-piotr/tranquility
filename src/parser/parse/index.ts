import { Scanner } from '../scanner/Scanner'
import { ParserContext } from './ParserContext'
import { parseProgram } from './parseProgram'
import { AstNode } from '../ast'
import { CompilationError } from '../../errors'

export interface ParseResult {
  ast: AstNode,
  errors: CompilationError
}

export function parse (source: string) {
  const scanner = Scanner.fromString(source)
  const ctx = new ParserContext(scanner)
  return {
    ast: parseProgram(ctx),
    errors: ctx.errors
  }
}
