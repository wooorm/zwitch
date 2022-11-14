import assert from 'node:assert/strict'
import test from 'node:test'
import {zwitch} from './index.js'

test('zwitch(options)', function () {
  const handleNone = zwitch('type')

  assert.equal(
    handleNone(null),
    undefined,
    'should not fail when not given an object'
  )
  assert.equal(handleNone({}), undefined, 'should not fail without `key`')
  assert.equal(
    handleNone({type: 'unknown'}),
    undefined,
    'should not fail with unknown `key`'
  )

  const handleInvalid = zwitch('type', {invalid})

  assert.throws(
    function () {
      handleInvalid(null)
    },
    /Invalid: `null`/,
    'should call `invalid` when not given an object'
  )

  assert.throws(
    function () {
      handleInvalid({})
    },
    /Invalid: `\[object Object]`/,
    'should call `invalid` when without key'
  )

  const handleInvalidAndUndefined = zwitch('type', {invalid, unknown})

  assert.throws(
    function () {
      handleInvalidAndUndefined({type: 'alpha'})
    },
    /Unknown: `alpha`/,
    'should call `unknown` when unknown'
  )

  const handleAll = zwitch('type', {unknown, invalid, handlers: {alpha, beta}})

  assert.equal(
    handleAll({type: 'alpha', value: 'a'}),
    'a',
    'should call a handler'
  )
})

/**
 * @param {unknown} value
 * @returns {never}
 */
function invalid(value) {
  throw new Error('Invalid: `' + value + '`')
}

/**
 * @param {unknown} value
 * @returns {never}
 */
function unknown(value) {
  // @ts-expect-error: JS guarantees there’s a `type`, TS can’t do that.
  throw new Error('Unknown: `' + value.type + '`')
}

/**
 * @param {{type: string, value: string}} value
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
