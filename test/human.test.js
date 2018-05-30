import test from 'ava'
import range from 'lodash.range'
import parse from '../src/parse'
const parseText = parse.text

test('every unit', t => {
  t.deepEqual(parseText('every second').schedules[0], { s: [0] })
  t.deepEqual(parseText('every minute').schedules[0], { m: [0] })
  t.deepEqual(parseText('every hour').schedules[0], { h: [0] })
  t.deepEqual(parseText('every day').schedules[0], { D: [1] })
  t.deepEqual(parseText('every week').schedules[0], { wy: [1] })
  t.deepEqual(parseText('every month').schedules[0], { M: [1] })
})

test('every 2 units', t => {
  t.deepEqual(parseText('every 2 hours').schedules[0], { h: range(0, 23, 2) })
  t.deepEqual(parseText('every 2 days').schedules[0], { D: range(1, 32, 2) })
  t.deepEqual(parseText('every 2 weeks').schedules[0], { wy: range(1, 55, 2) })
})

test('every 10 units', t => {
  t.deepEqual(parseText('every 10 seconds').schedules[0], { s: range(0, 60, 10) })
  t.deepEqual(parseText('every 10 minutes').schedules[0], { m: range(0, 60, 10) })
  t.deepEqual(parseText('every 10 hours').schedules[0], { h: range(0, 24, 10) })
  t.deepEqual(parseText('every 10 days').schedules[0], { D: range(1, 32, 10) })
})

test('weekdays', t => {
  t.deepEqual(parseText('every weekday').schedules[0], { d: range(2, 7) })
  t.deepEqual(parseText('every weekend').schedules[0], { d: [1, 7] })
  t.deepEqual(parseText('every 2nd day of the week').schedules[0], { d: [1, 3, 5, 7] })
})

test('first and last', t => {
  t.deepEqual(parseText('on the first hour').schedules[0], { h: [0] })
  t.deepEqual(parseText('on the last hour').schedules[0], { h: [23] })
  t.deepEqual(parseText('on the first day of the week').schedules[0], { d: [1] })
  t.deepEqual(parseText('on the last day of the week').schedules[0], { d: [7] })
  t.deepEqual(parseText('on the first day of the month').schedules[0], { D: [1] })
  // t.deepEqual(parseText('on the last day of the month').schedules[0], { D: [31] })
  t.deepEqual(parseText('on the first month').schedules[0], { M: [1] })
  t.deepEqual(parseText('on the last month').schedules[0], { M: [12] })
})

test('specific day', t => {
  t.deepEqual(parseText('on Sun').schedules[0], { d: [1] })
  t.deepEqual(parseText('on Mon').schedules[0], { d: [2] })
  t.deepEqual(parseText('on Fri').schedules[0], { d: [6] })
  t.deepEqual(parseText('on Sat').schedules[0], { d: [7] })
  t.deepEqual(parseText('on Monday').schedules[0], { d: [2] })
  t.deepEqual(parseText('on Saturday').schedules[0], { d: [7] })
})

test('specific time', t => {
  const t5 = 60 * 60 * 5 + 5 * 60
  t.deepEqual(parseText('at 5:05').schedules[0], { t: [t5] })
  t.deepEqual(parseText('at 05:05').schedules[0], { t: [t5] })
  t.deepEqual(parseText('at 5:05 am').schedules[0], { t: [t5] })
  t.deepEqual(parseText('at 06:00 PM').schedules[0], { t: [3600 * 18] })
})

test('mixed', t => {
  t.deepEqual(parseText('on Wed at 1:00').schedules[0], { d: [4], t: [3600] })
  const t2230 = 3600 * 22 + 30 * 60
  t.deepEqual(parseText('on Thu at 22:30').schedules[0], { d: [5], t: [t2230] })
})

test('invalid', t => {
  t.falsy(parseText('a').schedules[0])
  t.falsy(parseText('once').schedules[0])
  t.falsy(parseText('every').schedules[0])
  t.falsy(parseText('every x').schedules[0])
})
