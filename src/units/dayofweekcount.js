/**
 * Day of Week Count Constraint (dc)
 * (c) 2013 Bill, BunKat LLC.
 *
 * Definition for a day of week count constraint type. This constraint is used
 * to specify schedules like '2nd Tuesday of every month'.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDay = require('./day')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'day of week count',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 604800,

  /**
   * The day of week count value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.dc || (d.dc = Math.floor((uDay.val(d) - 1) / 7) + 1)
  },

  /**
   * Returns true if the val is valid for the date specified.
   *
   * @param {Date} d: The date to check the value on
   * @param {Integer} val: The value to validate
   */
  isValid: function(d, val) {
    return this.val(d) === val || (val === 0 && uDay.val(d) > uDay.extent(d)[1] - 7)
  },

  /**
   * The minimum and maximum valid day values of the month specified.
   * Zero to specify the last day of week count of the month.
   *
   * @param {Date} d: The date indicating the month to find the extent of
   */
  extent: function(d) {
    return d.dcExtent || (d.dcExtent = [1, Math.ceil(uDay.extent(d)[1] / 7)])
  },

  /**
   * The first day of the month with the same day of week count as the date
   * specified.
   *
   * @param {Date} d: The specified date
   */
  start: function(d) {
    return (
      d.dcStart ||
      (d.dcStart = date.next(uYear.val(d), uMonth.val(d), Math.max(1, (this.val(d) - 1) * 7 + 1 || 1)))
    )
  },

  /**
   * The last day of the month with the same day of week count as the date
   * specified.
   *
   * @param {Date} d: The specified date
   */
  end: function(d) {
    return (
      d.dcEnd ||
      (d.dcEnd = date.prev(uYear.val(d), uMonth.val(d), Math.min(this.val(d) * 7, uDay.extent(d)[1])))
    )
  },

  /**
   * Returns the next earliest date with the day of week count specified.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  next: function(d, val) {
    val = val > this.extent(d)[1] ? 1 : val
    var month = date.nextRollover(d, val, this, uMonth),
      dcMax = this.extent(month)[1]

    val = val > dcMax ? 1 : val

    var next = date.next(
      uYear.val(month),
      uMonth.val(month),
      val === 0 ? uDay.extent(month)[1] - 6 : 1 + 7 * (val - 1)
    )

    if (next.getTime() <= d.getTime()) {
      month = uMonth.next(d, uMonth.val(d) + 1)

      return date.next(
        uYear.val(month),
        uMonth.val(month),
        val === 0 ? uDay.extent(month)[1] - 6 : 1 + 7 * (val - 1)
      )
    }

    return next
  },

  /**
   * Returns the closest previous date with the day of week count specified.
   *
   * @param {Date} d: The starting date
   * @param {int} val: The desired value, must be within extent
   */
  prev: function(d, val) {
    var month = date.prevRollover(d, val, this, uMonth),
      dcMax = this.extent(month)[1]

    val = val > dcMax ? dcMax : val || dcMax

    return this.end(date.prev(uYear.val(month), uMonth.val(month), 1 + 7 * (val - 1)))
  }
}
