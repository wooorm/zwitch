import {expectType, expectAssignable} from 'tsd'
import {zwitch} from './index.js'

type Alpha = Record<string, unknown> & {type: 'alpha'}
type Bravo = Record<string, unknown> & {type: 'bravo'}

const handle = zwitch('type', {
  invalid(value) {
    expectType<unknown>(value)
    throw new Error('!')
  },
  unknown(value) {
    expectType<unknown>(value)
    return 1
  },
  handlers: {
    alpha(value: Alpha): 'a' {
      return 'a'
    },
    bravo(value: Bravo): 'b' {
      expectType<'bravo'>(value.type)
      return 'b'
    }
  }
})

// Unfortunately I can’t figure out a way to narrow this down :'(
// PRs welcome!
expectType<'a' | 'b'>(handle({type: 'alpha'}))
expectType<'a' | 'b'>(handle({type: 'bravo'}))

// This is the unknown case.
expectType<number>(handle({type: 'charlie'}))
