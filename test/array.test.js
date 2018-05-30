import test from 'ava'
import { arraySort } from '../src/array'

test('array sort unchanged', t => {
  const initial = [1,2,3,4,5]
  const expected = [1,2,3,4,5]
  arraySort(initial)
  t.deepEqual(initial, expected)
})

test('array natural sort', t => {
  const initial = [6,9,2,4,3]
  const expected = [2,3,4,6,9]
  arraySort(initial)
  t.deepEqual(initial, expected)
})

test('array sort zero first', t => {
  const initial = [6,9,2,4,0,3]
  const expected = [0,2,3,4,6,9]
  arraySort(initial)
  t.deepEqual(initial, expected)
})

test('array sort zero last', t => {
  const initial = [6,9,2,4,0,3]
  const expected = [2,3,4,6,9,0]
  arraySort(initial, true)
  t.deepEqual(initial, expected)
})
