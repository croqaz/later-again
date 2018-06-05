/**
 * Month Constraint (M)
 * (c) 2013 Bill, BunKat LLC.
 * (c) 2018 Cristi Constantin
 *
 * Definition for a month constraint type.
 */
const year = require('./year')
const date = require('../date')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'month',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 2629740,

  /**
   * The month value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.M || (d.M = Date.prototype.getUTCMonth.call(d) + 1)
  },

  /**
   * The minimum and maximum valid month values. Unlike the native date object,
   * month values in later are 1 based.
   */
  extent: function() {
    return [1, 12]
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
  return module.exports.val(d) === (val || 12)
}

/**
 * The start of the month of the specified date.
 *
 * @param {Date} d: The specified date
 */
function start(d) {
  return d.MStart || (d.MStart = date.next(year.val(d), module.exports.val(d)))
}

/**
 * The end of the month of the specified date.
 *
 * @param {Date} d: The specified date
 */
function end(d) {
  return d.MEnd || (d.MEnd = date.prev(year.val(d), module.exports.val(d)))
}

/**
 * Returns the start of the next instance of the month value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function next(d, val) {
  val = val > 12 ? 1 : val || 12

  return date.next(year.val(d) + (val > module.exports.val(d) ? 0 : 1), val)
}

/**
 * Returns the end of the previous instance of the month value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function prev(d, val) {
  val = val > 12 ? 12 : val || 12

  return date.prev(year.val(d) - (val >= module.exports.val(d) ? 1 : 0), val)
}
