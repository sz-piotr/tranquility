import { empty } from './tokenize_cases/empty'
import { operators } from './tokenize_cases/operators'
import { keywords } from './tokenize_cases/keywords'
import { comments } from './tokenize_cases/comments'

describe('Scanner', () => {
  empty()
  operators()
  keywords()
  comments()
})
