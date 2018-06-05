const constants = require('./constants')

/**
 * Builds and returns a new Date using the specified values.
 * Date returned is UTC based.
 *
 * @param {Int} Y: Four digit year
 * @param {Int} M: Month between 1 and 12, defaults to 1
 * @param {Int} D: Date between 1 and 31, defaults to 1
 * @param {Int} h: Hour between 0 and 23, defaults to 0
 * @param {Int} m: Minute between 0 and 59, defaults to 0
 * @param {Int} s: Second between 0 and 59, defaults to 0
 */
function next (Y, M, D, h, m, s) {
  return new Date(Date.UTC(Y, M !== undefined ? M - 1 : 0, D !== undefined ? D : 1, h || 0, m || 0, s || 0))
}

/**
 * Next Rollover
 *
 * Determines if a value will cause a particualr constraint to rollover to the
 * next largest time period. Used primarily when a constraint has a
 * variable extent.
 */
function nextRollover (d, val, constraint, period) {
  const cur = constraint.val(d)
  const max = constraint.extent(d)[1]

  return (val || max) <= cur || val > max ? new Date(period.end(d).getTime() + constants.SEC) : period.start(d)
}

/**
 * Builds and returns a new Date using the specified values.
 * Date returned is UTC based.
 *
 * @param {Int} Y: Four digit year
 * @param {Int} M: Month between 0 and 11, defaults to 11
 * @param {Int} D: Date between 1 and 31, defaults to last day of month
 * @param {Int} h: Hour between 0 and 23, defaults to 23
 * @param {Int} m: Minute between 0 and 59, defaults to 59
 * @param {Int} s: Second between 0 and 59, defaults to 59
 */
function prev (Y, M, D, h, m, s) {
  const len = arguments.length
  const day = require('./units/day')

  M = len < 2 ? 11 : M - 1
  D = len < 3 ? day.extent(next(Y, M + 1))[1] : D
  h = len < 4 ? 23 : h
  m = len < 5 ? 59 : m
  s = len < 6 ? 59 : s

  return new Date(Date.UTC(Y, M, D, h, m, s))
}

/**
 * Prev Rollover
 *
 * Determines if a value will cause a particualr constraint to rollover to the
 * previous largest time period. Used primarily when a constraint has a
 * variable extent.
 */
function prevRollover (d, val, constraint, period) {
  const cur = constraint.val(d)

  return val >= cur || !val ? period.start(period.prev(d, period.val(d) - 1)) : period.start(d)
}

module.exports = { next, prev, nextRollover, prevRollover }
