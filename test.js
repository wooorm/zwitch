import test from 'tape'
import {zwitch} from './index.js'

test('zwitch(options)', function (t) {
  var handleNone = zwitch('type')

  t.equal(
    handleNone(null),
    undefined,
    'should not fail when not given an object'
  )
  t.equal(handleNone({}), undefined, 'should not fail without `key`')
  t.equal(
    handleNone({type: 'unknown'}),
    undefined,
    'should not fail with unknown `key`'
  )

  var handleInvalid = zwitch('type', {invalid})

  t.throws(
    function () {
      handleInvalid(null)
    },
    /Invalid: `null`/,
    'should call `invalid` when not given an object'
  )

  t.throws(
    function () {
      handleInvalid({})
    },
    /Invalid: `\[object Object]`/,
    'should call `invalid` when without key'
  )

  var handleInvalidAndUndefined = zwitch('type', {invalid, unknown})

  t.throws(
    function () {
      handleInvalidAndUndefined({type: 'alpha'})
    },
    /Unknown: `alpha`/,
    'should call `unknown` when unknown'
  )

  var handleAll = zwitch('type', {unknown, invalid, handlers: {alpha, beta}})

  t.equal(handleAll({type: 'alpha', value: 'a'}), 'a', 'should call a handler')

  t.end()
})

/**
 * @param {unknown} value
 * @returns {never}
 */
function invalid(value) {
  throw new Error('Invalid: `' + value + '`')
}

/**
 * @param {{[key: string]: unknown, type: string}} value
 * @returns {never}
 */
function unknown(value) {
  throw new Error('Unknown: `' + value.type + '`')
}

/**
 * @param {{type: string, value: string}} value
 * @return {string}
 */
function alpha(value) {
  return value.value
}

/**
 * @param {{type: string, value: number}} value
 * @return {number}
 */
function beta(value) {
  return value.value
}
