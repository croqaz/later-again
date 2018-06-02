/**
 * Date Constants
 * (c) 2013 Bill, BunKat LLC.
 *
 * Useful constants for dealing with time conversions.
 */

const constants = {}

module.exports = constants

// Time to milliseconds conversion
constants.SEC = 1000
constants.MIN = constants.SEC * 60
constants.HOUR = constants.MIN * 60
constants.DAY = constants.HOUR * 24
constants.WEEK = constants.DAY * 7

// Array of days in each month, must be corrected for leap years
constants.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// Constant for specifying that a schedule can never occur
constants.NEVER = 0
