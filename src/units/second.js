/**
 * Second Constraint (s)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a second constraint type.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDay = require('./day')
const uHour = require('./hour')
const uMinut = require('./minute')
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
    const s = this.val(d)
    const inc = val > 59 ? 60 - s : val <= s ? 60 - s + val : val - s
    const next = new Date(d.getTime() + inc * constants.SEC)
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
      uYear.val(d),
      uMonth.val(d),
      uDay.val(d),
      uHour.val(d),
      uMinut.val(d) + (val >= this.val(d) ? -1 : 0),
      val
    )
  }
}
