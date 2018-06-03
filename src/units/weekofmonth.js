/**
 * Week of Month Constraint (wm)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for an week of month constraint type. Week of month treats the
 * first of the month as the start of week 1, with each following week
 * starting on Sunday.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDay = require('./day')
const uDayOfWeek = require('./dayofweek')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'week of month',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 604800,

  /**
   * The week of month value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.wm || (d.wm = (uDay.val(d) + (uDayOfWeek.val(uMonth.start(d)) - 1) + (7 - uDayOfWeek.val(d))) / 7)
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
   * The minimum and maximum valid week of month values for the month indicated.
   * Zero indicates the last week in the month.
   *
   * @param {Date} d: The date indicating the month to find values for
   */
  extent: function(d) {
    return (
      d.wmExtent ||
      (d.wmExtent = [
        1,
        (uDay.extent(d)[1] + (uDayOfWeek.val(uMonth.start(d)) - 1) + (7 - uDayOfWeek.val(uMonth.end(d)))) / 7
      ])
    )
  },

  /**
   * The start of the week of the specified date.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return (
      d.wmStart ||
      (d.wmStart = date.next(uYear.val(d), uMonth.val(d), Math.max(uDay.val(d) - uDayOfWeek.val(d) + 1, 1)))
    )
  },

  /**
   * The end of the week of the specified date.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return (
      d.wmEnd ||
      (d.wmEnd = date.prev(
        uYear.val(d),
        uMonth.val(d),
        Math.min(uDay.val(d) + (7 - uDayOfWeek.val(d)), uDay.extent(d)[1])
      ))
    )
  },

  /**
   * Returns the start of the next instance of the week value indicated. Returns
   * the first day of the next month if val is greater than the number of
   * days in the following month.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    val = val > this.extent(d)[1] ? 1 : val

    var month = date.nextRollover(d, val, this, uMonth),
      wmMax = this.extent(month)[1]

    val = val > wmMax ? 1 : val || wmMax

    // jump to the Sunday of the desired week, set to 1st of month for week 1
    return date.next(
      uYear.val(month),
      uMonth.val(month),
      Math.max(1, (val - 1) * 7 - (uDayOfWeek.val(month) - 2))
    )
  },

  /**
   * Returns the end of the previous instance of the week value indicated. Returns
   * the last day of the previous month if val is greater than the number of
   * days in the previous month.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    var month = date.prevRollover(d, val, this, uMonth),
      wmMax = this.extent(month)[1]

    val = val > wmMax ? wmMax : val || wmMax

    // jump to the end of Saturday of the desired week
    return this.end(
      date.next(uYear.val(month), uMonth.val(month), Math.max(1, (val - 1) * 7 - (uDayOfWeek.val(month) - 2)))
    )
  }
}
