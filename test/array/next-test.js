const should = require('should')
const array = require('../../src/array')
const arrayNext = array.next

describe('Later.array.next', function () {
  it('should exist', function () {
    should.exist(arrayNext)
  })

  it('should return the next highest value', function () {
    var arr = [1, 2, 4, 5],
      cur = 3,
      extent = [1, 5],
      expected = 4,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value with array size of 1', function () {
    var arr = [1],
      cur = 3,
      extent = [1, 5],
      expected = 1,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value with array size of 1 with same value', function () {
    var arr = [1],
      cur = 1,
      extent = [1, 5],
      expected = 1,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value with array size of 1 with zero value', function () {
    var arr = [0],
      cur = 30,
      extent = [1, 31],
      expected = 0,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value which might be the first value', function () {
    var arr = [1, 2, 3, 4, 5],
      cur = 0,
      extent = [1, 5],
      expected = 1,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value, wrapping if needed', function () {
    var arr = [0, 1, 2, 3, 4, 5],
      cur = 6,
      extent = [0, 5],
      expected = 0,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value, which might be zero', function () {
    var arr = [1, 2, 3, 4, 5, 0],
      cur = 6,
      extent = [1, 10],
      expected = 0,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return current value when it is in the list', function () {
    var arr = [1, 2, 4, 5, 0],
      cur = 4,
      extent = [1, 10],
      expected = 4,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })

  it('should return the next highest value when cur is greater than last value', function () {
    var arr = [1, 2, 4, 5, 0],
      cur = 12,
      extent = [1, 10],
      expected = 1,
      actual = arrayNext(cur, arr, extent)

    actual.should.eql(expected)
  })
})
