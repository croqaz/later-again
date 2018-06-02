const day = require('./day')
const dayofweekcount = require('./dayofweekcount')
const dayofweek = require('./dayofweek')
const dayofyear = require('./dayofyear')
const fulldate = require('./fulldate')
const hour = require('./hour')
const minute = require('./minute')
const month = require('./month')
const second = require('./second')
const time = require('./time')
const weekofmonth = require('./weekofmonth')
const weekofyear = require('./weekofyear')
const year = require('./year')

module.exports = {
  // ---
  day,
  D: day,
  // ---
  dayofweek,
  d: dayofweek,
  dw: dayofweek,
  dayOfWeek: dayofweek,
  // ---
  dayofweekcount,
  dc: dayofweekcount,
  dayOfWeekCount: dayofweekcount,
  // ---
  dayofyear,
  dy: dayofyear,
  dayOfYear: dayofyear,
  // ---
  fulldate,
  fd: fulldate,
  fullDate: fulldate,
  // ---
  hour,
  h: hour,
  // ---
  minute,
  m: minute,
  // ---
  month,
  M: month,
  // ---
  second,
  s: second,
  // ---
  time,
  t: time,
  // ---
  weekofmonth,
  wm: weekofmonth,
  weekOfMonth: weekofmonth,
  // ---
  weekofyear,
  wy: weekofyear,
  weekOfYear: weekofyear,
  // ---
  year,
  Y: year
}
