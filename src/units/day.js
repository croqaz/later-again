/**
 * Day Constraint (D)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a day of month (date) constraint type.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDayYear = require('./dayofyear')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'day',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 86400,

  /**
   * The day value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.D || (d.D = Date.prototype.getUTCDate.call(d))
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
   * The minimum and maximum valid day values of the month specified.
   * Zero to specify the last day of the month.
   *
   * @param {Date} d: The date indicating the month to find the extent of
   */
  extent: function(d) {
    if (d.DExtent) return d.DExtent

    const month = uMonth.val(d)
    let max = constants.DAYS_IN_MONTH[month - 1]

    if (month === 2 && uDayYear.extent(d)[1] === 366) {
      max += 1
    }

    return (d.DExtent = [1, max])
  },

  /**
   * The start of the day of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return d.DStart || (d.DStart = date.next(uYear.val(d), uMonth.val(d), this.val(d)))
  },

  /**
   * The end of the day of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return d.DEnd || (d.DEnd = date.prev(uYear.val(d), uMonth.val(d), this.val(d)))
  },

  /**
   * Returns the start of the next instance of the day value indicated. Returns
   * the first day of the next month if val is greater than the number of
   * days in the following month.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    val = val > this.extent(d)[1] ? 1 : val
    var month = date.nextRollover(d, val, this, uMonth),
      DMax = this.extent(month)[1]

    val = val > DMax ? 1 : val || DMax

    return date.next(uYear.val(month), uMonth.val(month), val)
  },

  /**
   * Returns the end of the previous instance of the day value indicated. Returns
   * the last day in the previous month if val is greater than the number of days
   * in the previous month.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    var month = date.prevRollover(d, val, this, uMonth),
      DMax = this.extent(month)[1]

    return date.prev(uYear.val(month), uMonth.val(month), val > DMax ? DMax : val || DMax)
  }
}
