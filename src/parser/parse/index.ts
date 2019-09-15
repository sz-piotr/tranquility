import { Scanner } from '../scanner/Scanner'
import { ParserContext } from './ParserContext'
import { parseProgram } from './parseProgram'
import * as Ast from '../ast'
import * as Err from '../../errors'

export interface ParseResult {
  ast: Ast.AstNode,
  errors: Err.Error[]
}

export function parse (source: string) {
  const scanner = Scanner.fromString(source)
  const ctx = new ParserContext(scanner)
  return {
    ast: parseProgram(ctx),
    errors: ctx.errors
  }
}
