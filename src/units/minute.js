/**
 * Minute Constraint (m)
 * (c) 2013 Bill, BunKat LLC.
 * (c) 2018 Cristi Constantin
 *
 * Definition for a minute constraint type.
 */
const date = require('../date')
const uYear = require('./year')
const uMonth = require('./month')
const uDay = require('./day')
const uHour = require('./hour')
const constants = require('../constants')

module.exports = {
  /**
   * The name of this constraint.
   */
  name: 'minute',

  /**
   * The rough amount of seconds between start and end for this constraint.
   * (doesn't need to be exact)
   */
  range: 60,

  /**
   * The minute value of the specified date.
   *
   * @param {Date} d: The date to calculate the value of
   */
  val: function(d) {
    return d.m || (d.m = Date.prototype.getUTCMinutes.call(d))
  },

  /**
   * The minimum and maximum valid minute values.
   */
  extent: function(d) {
    return [0, 59]
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
 * The start of the minute of the specified date.
 *
 * @param {Date} d: The specified date
 */
function start(d) {
  return (
    d.mStart || (d.mStart = date.next(uYear.val(d), uMonth.val(d), uDay.val(d), uHour.val(d), module.exports.val(d)))
  )
}

/**
 * The end of the minute of the specified date.
 *
 * @param {Date} d: The specified date
 */
function end(d) {
  return d.mEnd || (d.mEnd = date.prev(uYear.val(d), uMonth.val(d), uDay.val(d), uHour.val(d), module.exports.val(d)))
}

/**
 * Returns the start of the next instance of the minute value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function next(d, val) {
  const uSecond = require('./second')
  const m = module.exports.val(d)
  const s = uSecond.val(d)
  const inc = val > 59 ? 60 - m : val <= m ? 60 - m + val : val - m
  const next = new Date(d.getTime() + inc * constants.MIN - s * constants.SEC)
  return next
}

/**
 * Returns the end of the previous instance of the minute value indicated.
 *
 * @param {Date} d: The starting date
 * @param {int} val: The desired value, must be within extent
 */
function prev(d, val) {
  val = val > 59 ? 59 : val

  return date.prev(
    uYear.val(d),
    uMonth.val(d),
    uDay.val(d),
    uHour.val(d) + (val >= module.exports.val(d) ? -1 : 0),
    val
  )
}
