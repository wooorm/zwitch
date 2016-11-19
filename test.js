'use strict';

var test = require('tape');
var zwitch = require('./');

test('zwitch(options)', function (t) {
  var handle = zwitch('type');

  t.equal(handle(null), undefined, 'should not fail when not given an object');
  t.equal(handle({}), undefined, 'should not fail without `key`');
  t.equal(handle({type: 'unknown'}), undefined, 'should not fail with unknown `key`');

  handle.invalid = invalid;

  t.throws(
    function () {
      handle(null);
    },
    /Invalid: `null`/,
    'should invoke `invalid` when not given an object'
  );

  t.throws(
    function () {
      handle({});
    },
    /Invalid: `\[object Object]`/,
    'should invoke `invalid` when without key'
  );

  handle.unknown = unknown;

  t.throws(
    function () {
      handle({type: 'alpha'});
    },
    /Unknown: `alpha`/,
    'should invoke `unknown` when unknown'
  );

  handle.handlers.alpha = alpha;

  t.equal(handle({type: 'alpha', value: 'a'}), 'a', 'should invoke a handler');

  t.end();
});

function invalid(value) {
  throw new Error('Invalid: `' + value + '`');
}

function unknown(value) {
  throw new Error('Unknown: `' + value.type + '`');
}

function alpha(value) {
  return value.value;
}
