/**
 * Day of Year Constraint (dy)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a day of year constraint type.
 */
const date = require('../date')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'day of year',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 86400,

  /**
   * The day of year value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.dy || (d.dy = Math.ceil(1 + (later.D.start(d).getTime() - later.Y.start(d).getTime()) / constants.DAY))
  },

  /**
   * Returns true if the val is valid for the date specified.
   *
   * @param {Date} d: The date to check the value on
   * @param {Integer} val: The value to validate
   */
  isValid: function(d, val) {
    return this.val(d) === (val || this.extent(d)[1])
  },

  /**
   * The minimum and maximum valid day of year values of the month specified.
   * Zero indicates the last day of the year.
   *
   * @param {Date} d: The date indicating the month to find the extent of
   */
  extent: function(d) {
    const year = later.Y.val(d)
    // shortcut on finding leap years since this function gets called a lot
    // works between 1901 and 2099
    return d.dyExtent || (d.dyExtent = [1, year % 4 ? 365 : 366])
  },

  /**
   * The start of the day of year of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return later.D.start(d)
  },

  /**
   * The end of the day of year of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return later.D.end(d)
  },

  /**
   * Returns the start of the next instance of the day of year value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    val = val > this.extent(d)[1] ? 1 : val
    var year = date.nextRollover(d, val, later.dy, later.Y),
      dyMax = this.extent(year)[1]

    val = val > dyMax ? 1 : val || dyMax

    return date.next(later.Y.val(year), later.M.val(year), val)
  },

  /**
   * Returns the end of the previous instance of the day of year value indicated.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    var year = date.prevRollover(d, val, later.dy, later.Y),
      dyMax = this.extent(year)[1]

    val = val > dyMax ? dyMax : val || dyMax

    return date.prev(later.Y.val(year), later.M.val(year), val)
  }
}
