// based on rd-parse

const IGNORE = 'ignore'
const VERBATIM = 'verbatim'

type TokenDeclarator<T> = (pattern: RegExp, type: string) => Rule<T>
type AllDeclarator<T> = (...rulesOrStrings: (string | Rule<T>)[]) => Rule<T>
type AnyDeclarator<T> = (...rulesOrStrings: (string | Rule<T>)[]) => Rule<T>
type PlusDeclarator<T> = (ruleOrString: string | Rule<T>) => Rule<T>
type OptionalDeclarator<T> = (ruleOrString: string | Rule<T>) => Rule<T>
type NodeDeclarator<T> = (ruleOrString: string | Rule<T>, reducer: (value: any[], $: ParserState<T>, $next: ParserState<T>) => T) => Rule<T>
type Rule<T> = ($: ParserState<T>) => ParserState<T>

type Grammar<T> = (
  Token: TokenDeclarator<T>,
  All: AllDeclarator<T>,
  Any: AnyDeclarator<T>,
  Plus: PlusDeclarator<T>,
  Optional: OptionalDeclarator<T>,
  Node: NodeDeclarator<T>,
) => Rule<T>

interface TokenDefinition {
  type: string,
  pattern: RegExp,
}

interface LexicalTokenNode {
  start: number,
  end: number,
  type: string,
  captures: string[],
}

interface ParserState<T> {
  ti: number,
  sp: number,
  context: {
    text: string,
    tokens: LexicalTokenNode[],
    stack: (string | T)[],
    lastSeen: number,
  },
}

export class Parser<T> {
  private parsingFunction: Rule<T>
  public constructor(grammar: Grammar<T>) {
    function nextToken($: ParserState<T>, newProp: Partial<ParserState<T>>): ParserState<T> {
      if ($.context.lastSeen < $.ti) {
        $.context.lastSeen = $.ti
      }
      return { ...$, ...newProp }
    }

    const self = this

    function Verbatim(text: string) {
      return function ($: ParserState<T>) {
        let token = $.context.tokens[$.ti]
        if (!token || token.type !== VERBATIM) return $
        if (token.captures[0] !== text) return $
        return nextToken($, { ti: $.ti + 1 })
      }
    }

    function Token(pattern: RegExp, type: string) {
      self.registerToken(pattern, type)

      return function ($: ParserState<T>) {
        let token = $.context.tokens[$.ti]
        if (!token || token.type !== type) return $

        let stack = $.context.stack
        stack.splice($.sp)
        stack.push(...token.captures)
        return nextToken($, { ti: $.ti + 1, sp: stack.length })
      }
    }

    function Apply(ruleOrString: string | Rule<T>) {
      if (typeof (ruleOrString) === 'function') return ruleOrString
      return Verbatim(ruleOrString)
    }

    function All(...rulesOrStrings: (string | Rule<T>)[]) {
      const rules = rulesOrStrings.map(Apply)

      return function ($: ParserState<T>) {
        for (var i = 0, $cur = $; i < rules.length; i++) {
          var $next = rules[i]($cur)
          if ($next === $cur) return $   // if one rule fails: fail all
          $cur = $next
        }
        return $cur
      }
    }

    function Any(...rulesOrStrings: (string | Rule<T>)[]) {
      const rules = rulesOrStrings.map(Apply)

      return function ($: ParserState<T>) {
        for (var i = 0; i < rules.length; i++) {
          var $next = rules[i]($)
          if ($next !== $) return $next
        }
        return $
      }
    }

    function Plus(ruleOrString: string | Rule<T>) {
      const rule = Apply(ruleOrString)

      return function ($: ParserState<T>) {
        var $cur, $next
        for ($cur = $; ($next = rule($cur)) !== $cur; $cur = $next);
        return $cur
      }
    }

    function Optional(ruleOrString: string | Rule<T>) {
      const rule = Apply(ruleOrString)

      return function ($: ParserState<T>) {
        var $next = rule($)
        if ($next !== $) return $next
        return { ...$ }
      }
    }

    const Node: NodeDeclarator<T> = (ruleOrString, reducer) => {
      const rule = Apply(ruleOrString)

      return function ($: ParserState<T>) {
        var $next = rule($)
        if ($next === $) return $

        // We have a match
        let stack = $.context.stack
        const args = stack.splice($.sp)
        stack.push(reducer(args, $, $next))

        return { ...$next, sp: stack.length }
      }
    }


    this.parsingFunction = grammar(Token, All, Any, Plus, Optional, Node)
  }

  private tokens: TokenDefinition[] = []

  private registerToken(pattern: RegExp, type: string) {
    this.tokens.push({
      pattern: pattern,
      type: type
    })
  }

  private lexer(text: string): LexicalTokenNode[] {

    var nodes = [], pos = 0

    while (pos < text.length) {
      var here = pos

      for (var i = 0; i < this.tokens.length; i++) {
        var token = this.tokens[i]

        token.pattern.lastIndex = here
        var match = token.pattern.exec(text)

        if (match && match.index === here) {
          pos += match[0].length

          if (token.type === IGNORE) break

          nodes.push({
            start: here,
            end: pos,
            type: token.type,
            captures: match.slice(1),
          })
          break
        }
      }

      if (pos === here) {
        throw new Error('Unexpected token at position ' + pos + '. Remainder: ' + text.substr(pos))
      }
    }
    return nodes
  }

  public parse(text: string): T {
    const $: ParserState<T> = {
      ti: 0, sp: 0,
      context: {
        text,
        tokens: this.lexer(text),
        stack: [],
        lastSeen: -1,
      }
    }

    const $next = this.parsingFunction($)

    if ($next.ti < $.context.tokens.length) {
      throw new ParseError($.context)
    }

    return $.context.stack[0] as T
  }
}

class ParseError extends Error {
  public constructor(public context: ParserState<unknown>['context']) {
    super('Parsing failed')
  }
}
