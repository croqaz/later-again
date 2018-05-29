import test from 'ava'
import range from 'lodash.range'
import parseCron from '../src/parseCron'

test('cron seconds', t => {
  t.deepEqual(parseCron('* * * * * *', true).schedules[0], { s: range(0, 60) })
  t.deepEqual(parseCron('1 * * * * *', true).schedules[0], { s: [1] })
  t.deepEqual(parseCron('6-9 * * * * *', true).schedules[0], { s: [6, 7, 8, 9] })
  t.deepEqual(parseCron('2,7,9 * * * * *', true).schedules[0], { s: [2, 7, 9] })
  t.deepEqual(parseCron('*/5 * * * * *', true).schedules[0], { s: range(0, 59, 5) })
  t.deepEqual(parseCron('*/10 * * * *  *', true).schedules[0], { s: range(0, 59, 10) })
  t.deepEqual(parseCron('1-6/2    * * 		* * *', true).schedules[0], { s: [1, 3, 5] })
  // At second 0
  t.deepEqual(parseCron('* * * * *').schedules[0], { s: [0] })
})

test('cron minutes', t => {
  t.deepEqual(parseCron('1 * * * *').schedules[0], { s: [0], m: [1] })
  t.deepEqual(parseCron('* 1 * * * *', true).schedules[0], { m: [1] })
  t.deepEqual(parseCron('* 1-3 * * * *', true).schedules[0], { m: [1, 2, 3] })
})

test('cron hours', t => {
  t.deepEqual(parseCron('* 1 * * *').schedules[0], { s: [0], h: [1] })
  t.deepEqual(parseCron('* * 1 * * *', true).schedules[0], { h: [1] })
  t.deepEqual(parseCron('* * 3-5 * * *', true).schedules[0], { h: [3, 4, 5] })
})

test('cron months', t => {
  t.deepEqual(parseCron('* * * * 1 *', true).schedules[0], { M: [1] })
  t.deepEqual(parseCron('* * * * 2-4 *', true).schedules[0], { M: [2, 3, 4] })
  t.deepEqual(parseCron('* * * * 4,6,8 *', true).schedules[0], { M: [4, 6, 8] })
})

test('cron years', t => {
  t.deepEqual(parseCron('* * * * * * 2018', true).schedules[0], { Y: [2018] })
  t.deepEqual(parseCron('* * * * * * 2017-2018', true).schedules[0], { Y: [2017, 2018] })
  t.deepEqual(parseCron('* * * * * * 2000,2018', true).schedules[0], { Y: [2000, 2018] })
})

test('cron day of the week', t => {
  t.deepEqual(parseCron('* * * * * 0', true).schedules[0], { d: [1] })
  t.deepEqual(parseCron('* * * * * 1', true).schedules[0], { d: [2] })
  t.deepEqual(parseCron('* * * * * 7', true).schedules[0], { d: [7] })

  t.deepEqual(parseCron('* * * * * SUN', true).schedules[0], { d: [1] })
  t.deepEqual(parseCron('* * * * * MON', true).schedules[0], { d: [2] })
  t.deepEqual(parseCron('* * * * * MON,TUE,FRI', true).schedules[0], { d: [2, 3, 6] })
})

test('cron keywords', t => {
  t.deepEqual(parseCron('@yearly').schedules, parseCron('0 0 1 1 *').schedules)
  t.deepEqual(parseCron('@annually').schedules, parseCron('0 0 1 1 *').schedules)
  t.deepEqual(parseCron('@monthly').schedules, parseCron('0 0 1 * *').schedules)
  t.deepEqual(parseCron('@weekly').schedules, parseCron('0 0 * * 0').schedules)
  t.deepEqual(parseCron('@daily').schedules, parseCron('0 0 * * *').schedules)
  t.deepEqual(parseCron('@midnight').schedules, parseCron('0 0 * * *').schedules)
  t.deepEqual(parseCron('@hourly').schedules, parseCron('0 * * * *').schedules)
})
