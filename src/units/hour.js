/**
 * Hour Constraint (h)
 * (c) 2013 Bill, BunKat LLC.
 * (c) 2018 Cristi Constantin
 *
 * Definition for a hour constraint type.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDay = require('./day')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'hour',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 3600,

  /**
   * The hour value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.h || (d.h = Date.prototype.getUTCHours.call(d))
  },

  /**
   * The minimum and maximum valid hour values.
   */
  extent: function() {
    return [0, 23]
  },

  isValid,
  start,
  end,
  next,
  prev
}

/**
 * Returns true if the val is valid for the date specified.
 *
 * @param {Date} d: The date to check the value on
 * @param {Integer} val: The value to validate
 */
function isValid(d, val) {
  return module.exports.val(d) === val
}

/**
 * The start of the hour of the specified date.
 *
 * @param {Date} d: The specified date
 */
function start(d) {
  return d.hStart || (d.hStart = date.next(uYear.val(d), uMonth.val(d), uDay.val(d), module.exports.val(d)))
}

/**
 * The end of the hour of the specified date.
 *
 * @param {Date} d: The specified date
 */
function end(d) {
  return d.hEnd || (d.hEnd = date.prev(uYear.val(d), uMonth.val(d), uDay.val(d), module.exports.val(d)))
}

/**
 * Returns the start of the next instance of the hour value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function next(d, val) {
  val = val > 23 ? 0 : val

  return date.next(uYear.val(d), uMonth.val(d), uDay.val(d) + (val <= module.exports.val(d) ? 1 : 0), val)
}

/**
 * Returns the end of the previous instance of the hour value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function prev(d, val) {
  val = val > 23 ? 23 : val

  return date.prev(uYear.val(d), uMonth.val(d), uDay.val(d) + (val >= module.exports.val(d) ? -1 : 0), val)
}
