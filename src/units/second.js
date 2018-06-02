/**
 * Second Constraint (s)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a second constraint type.
 */
const later = require('.')
const date = require('../date')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'second',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 1,

  /**
   * The second value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.s || (d.s = Date.prototype.getUTCSeconds.call(d))
  },

  /**
   * Returns true if the val is valid for the date specified.
   *
   * @param {Date} d: The date to check the value on
   * @param {Integer} val: The value to validate
   */
  isValid: function(d, val) {
    return this.val(d) === val
  },

  /**
   * The minimum and maximum valid second values.
   */
  extent: function() {
    return [0, 59]
  },

  /**
   * The start of the second of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: d => d,

  /**
   * The end of the second of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: d => d,

  /**
   * Returns the start of the next instance of the second value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    var s = this.val(d),
      inc = val > 59 ? 60 - s : val <= s ? 60 - s + val : val - s,
      next = new Date(d.getTime() + inc * constants.SEC)
    return next
  },

  /**
   * Returns the end of the previous instance of the second value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val, cache) {
    val = val > 59 ? 59 : val

    return date.prev(
      later.Y.val(d),
      later.M.val(d),
      later.D.val(d),
      later.h.val(d),
      later.m.val(d) + (val >= this.val(d) ? -1 : 0),
      val
    )
  }
}
