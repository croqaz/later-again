const should = require('should')

module.exports = runner = function(later, constraint) {
  function convertToUTC(d) {
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()))
  }

  function runSingleTest(fn, data) {
    const date = convertToUTC(data.date)
    const dateString = date.toUTCString()
    let ex = data[fn] instanceof Date ? convertToUTC(data[fn]) : data[fn]
    const exString = ex instanceof Date ? ex.toUTCString() : ex

    it('should return ' + exString + ' for ' + dateString, function() {
      var actual = constraint[fn](date)
      actual = actual instanceof Date ? actual.getTime() : actual
      ex = ex instanceof Date ? ex.getTime() : ex
      actual.should.eql(ex)
    })
  }

  function runSweepTest(fn, data) {
    var min = data.extent[0] === 1 ? 0 : data.extent[0],
      max = data.extent[1] + 1,
      inc = Math.ceil((max - min) / 200) // max 200 tests per constraint

    for (var i = min; i <= max; i = i + inc) {
      // test for overbounds
      if (fn === 'next') {
        testNext(data, i) // test all values for amt
      } else {
        testPrev(data, i) // test all values for amt
      }
    }
  }

  function testNext(data, amt) {
    const date = convertToUTC(data.date)
    const dateString = date.toUTCString()

    it('should return first date after ' + dateString + ' with val ' + amt, function() {
      var next = constraint.next(date, amt),
        ex = amt,
        outOfBounds = ex > constraint.extent(date)[1] || ex > constraint.extent(next)[1]

      // if amt is outside of extent, the constraint should rollover to the
      // first value of the following time period
      if (outOfBounds) ex = constraint.extent(next)[0]

      // hack to pass hour test that crosses DST
      if (ex === 2 && constraint.val(next) === 3 && next.getTimezoneOffset() !== date.getTimezoneOffset()) {
        ex = 3
      }

      // result should match ex, should be greater than date, and should
      // be at the start of the time period
      // if check is hack to support year constraints which can return undefined
      if (constraint.name === 'year' && (amt <= constraint.val(date) || amt > later.Y.extent()[1])) {
        next.should.eql(0)
      } else {
        constraint.isValid(next, ex).should.eql(true)
        next.getTime().should.be.above(date.getTime())

        // need to special case day of week count since the last nth day may
        // not fall on a week boundary
        if (constraint.name !== 'day of week count' || amt !== 0) {
          constraint
            .start(next)
            .getTime()
            .should.eql(next.getTime())
        }
      }
    })
  }

  function testPrev(data, amt) {
    const date = convertToUTC(data.date)
    const dateString = date.toUTCString()

    it('should return first date before ' + dateString + ' with val ' + amt, function() {
      var prev = constraint.prev(date, amt),
        ex = amt,
        outOfBounds = ex > constraint.extent(prev)[1]

      // if amt is outside of extent, the constraint should rollover to the
      // first value of the following time period
      if (outOfBounds) ex = constraint.extent(prev)[1]

      // result should match ex, should be greater than date, and should
      // be at the start of the time period
      // if check is hack to support year constraints which can return undefined
      if (constraint.name === 'year' && (amt >= constraint.val(date) || amt < later.Y.extent()[0])) {
        prev.should.eql(0)
      } else {
        constraint.isValid(prev, ex).should.eql(true)
        prev.getTime().should.be.below(date.getTime())
        constraint
          .end(prev)
          .getTime()
          .should.eql(prev.getTime())
      }
    })
  }

  return {
    run: function(data, isYear) {
      // simple tests have the expected value passed in as data
      ;['val', 'extent', 'start', 'end'].forEach(function(fn) {
        describe(fn, function() {
          for (let i = 0; i < data.length; i++) {
            runSingleTest(fn, data[i])
          }
        })
      })

      // complex tests do a sweep across all values and validate results
      // using checks verified by the simple tests
      ;['next', 'prev'].forEach(function(fn) {
        describe(fn, function() {
          for (let i = 0; i < data.length; i++) {
            runSweepTest(fn, data[i])
          }
        })
      })
    }
  }
}
