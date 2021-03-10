import test from 'tape'
import {zwitch} from './index.js'

test('zwitch(options)', function (t) {
  var handle = zwitch('type')

  t.equal(handle(null), undefined, 'should not fail when not given an object')
  t.equal(handle({}), undefined, 'should not fail without `key`')
  t.equal(
    handle({type: 'unknown'}),
    undefined,
    'should not fail with unknown `key`'
  )

  handle.invalid = invalid

  t.throws(
    function () {
      handle(null)
    },
    /Invalid: `null`/,
    'should call `invalid` when not given an object'
  )

  t.throws(
    function () {
      handle({})
    },
    /Invalid: `\[object Object]`/,
    'should call `invalid` when without key'
  )

  handle.unknown = unknown

  t.throws(
    function () {
      handle({type: 'alpha'})
    },
    /Unknown: `alpha`/,
    'should call `unknown` when unknown'
  )

  handle.handlers.alpha = alpha

  t.equal(handle({type: 'alpha', value: 'a'}), 'a', 'should call a handler')

  t.end()
})

/**
 * @param {unknown} value
 */
function invalid(value) {
  throw new Error('Invalid: `' + value + '`')
}

/**
 * @param {{[key: string]: unknown, type: string}} value
 */
function unknown(value) {
  throw new Error('Unknown: `' + value.type + '`')
}

/**
 * @param {{type: string, value: string}} value
 */
function alpha(value) {
  return value.value
}
