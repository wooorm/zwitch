/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module zwitch
 * @fileoverview Handle values based on a property.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var has = require('has');
var object = require('x-is-object');

/* Expose. */
module.exports = factory;

/* Methods. */
var noop = Function.prototype;

/**
 * Handle values based on a property.
 *
 * @param {string} key - Property to switch on.
 * @param {Object?} [options] - Configuration.
 * @return {Function} - Handle one value.
 */
function factory(key, options) {
  var settings = options || {};

  function one(value) {
    var fn = one.invalid;
    var handlers = one.handlers;

    if (object(value) && has(value, key)) {
      fn = has(handlers, value[key]) ? handlers[value[key]] : one.unknown;
    }

    return (fn || noop).apply(this, arguments);
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;

  return one;
}
