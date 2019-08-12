import { empty } from './cases/empty'
import { operators } from './cases/operators'
import { keywords } from './cases/keywords'
import { comments } from './cases/comments'

describe('Scanner', () => {
  empty()
  operators()
  keywords()
  comments()
})
