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
})

test('cron hours', t => {
  t.deepEqual(parseCron('* 1 * * *').schedules[0], { s: [0], h: [1] })
  t.deepEqual(parseCron('* * 1 * * *', true).schedules[0], { h: [1] })
})
