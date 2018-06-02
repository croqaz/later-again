/**
 * Year Constraint (Y)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a year constraint type.
 */
const date = require('../date')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'year',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 31556900,

  /**
   * The year value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.Y || (d.Y = Date.prototype.getUTCFullYear.call(d))
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
   * The minimum and maximum valid values for the year constraint.
   * If max is past 2099, later.D.extent must be fixed to calculate leap years
   * correctly.
   */
  extent: function() {
    return [1970, 2099]
  },

  /**
   * The start of the year of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return d.YStart || (d.YStart = date.next(this.val(d)))
  },

  /**
   * The end of the year of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return d.YEnd || (d.YEnd = date.prev(this.val(d)))
  },

  /**
   * Returns the start of the next instance of the year value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    return val > this.val(d) && val <= this.extent()[1] ? date.next(val) : constants.NEVER
  },

  /**
   * Returns the end of the previous instance of the year value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    return val < this.val(d) && val >= this.extent()[0] ? date.prev(val) : constants.NEVER
  }
}
