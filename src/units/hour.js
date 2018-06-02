/**
 * Hour Constraint (h)
 * (c) 2013 Bill, BunKat LLC.
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
   * Returns true if the val is valid for the date specified.
   *
   * @param {Date} d: The date to check the value on
   * @param {Integer} val: The value to validate
   */
  isValid: function(d, val) {
    return this.val(d) === val
  },

  /**
   * The minimum and maximum valid hour values.
   */
  extent: function() {
    return [0, 23]
  },

  /**
   * The start of the hour of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return d.hStart || (d.hStart = date.next(uYear.val(d), uMonth.val(d), uDay.val(d), this.val(d)))
  },

  /**
   * The end of the hour of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return d.hEnd || (d.hEnd = date.prev(uYear.val(d), uMonth.val(d), uDay.val(d), this.val(d)))
  },

  /**
   * Returns the start of the next instance of the hour value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    val = val > 23 ? 0 : val
    var next = date.next(uYear.val(d), uMonth.val(d), uDay.val(d) + (val <= this.val(d) ? 1 : 0), val)
    return next
  },

  /**
   * Returns the end of the previous instance of the hour value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    val = val > 23 ? 23 : val

    return date.prev(uYear.val(d), uMonth.val(d), uDay.val(d) + (val >= this.val(d) ? -1 : 0), val)
  }
}
