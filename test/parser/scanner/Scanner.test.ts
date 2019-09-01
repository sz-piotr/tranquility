import { empty } from './empty'
import { operators } from './operators'
import { keywords } from './keywords'
import { comments } from './comments'
import { strings } from './strings'

describe('Scanner', () => {
  empty()
  operators()
  keywords()
  comments()
  strings()
})
