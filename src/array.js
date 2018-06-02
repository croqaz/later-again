//
// Original code (c) 2013 by Bill, BunKat LLC
//

/**
 * Array sort
 *
 * Sorts an array in natural ascending order, placing zero at the end
 * if zeroIsLast is true.
 */
function arraySort(arr, zeroIsLast) {
  arr.sort(function(a, b) {
    return +a - +b
  })
  if (zeroIsLast && arr[0] === 0) {
    arr.push(arr.shift())
  }
}

/**
 * Array next
 *
 * Returns the next valid value in a range of values, wrapping as needed.
 * Assumes the array has already been sorted.
 */
function arrayNext(val, values, extent) {
  const zeroIsLargest = extent[0] !== 0
  let nextIdx = 0
  let cur

  for (let i = values.length - 1; i > -1; --i) {
    cur = values[i]

    if (cur === val) {
      return cur
    }

    if (cur > val || (cur === 0 && zeroIsLargest && extent[1] > val)) {
      nextIdx = i
      continue
    }

    break
  }

  return values[nextIdx]
}

/**
 * Array next invalid
 *
 * Returns the next invalid value in a range of values, wrapping as needed.
 * Assumes the array has already been sorted.
 */
function arrayNextInvalid(val, values, extent) {
  const [min, max] = extent
  const len = values.length
  const zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0
  const start = val
  let next = val
  let i = values.indexOf(val)

  while (next === (values[i] || zeroVal)) {
    next++
    if (next > max) {
      next = min
    }

    i++
    if (i === len) {
      i = 0
    }

    if (next === start) {
      return
    }
  }

  return next
}

/**
 * Array previous
 *
 * Returns the previous valid value in a range of values, wrapping as needed.
 * Assumes the array has already been sorted.
 */
function arrayPrev(val, values, extent) {
  const len = values.length
  const zeroIsLargest = extent[0] !== 0
  let prevIdx = len - 1
  let cur

  for (let i = 0; i < len; i++) {
    cur = values[i]

    if (cur === val) {
      return cur
    }

    if (cur < val || (cur === 0 && zeroIsLargest && extent[1] < val)) {
      prevIdx = i
      continue
    }

    break
  }

  return values[prevIdx]
}

/**
 * Array previous invalid
 *
 * Returns the previous invalid value in a range of values, wrapping as needed.
 * Assumes the array has already been sorted.
 */
function arrayPrevInvalid(val, values, extent) {
  const [min, max] = extent
  const len = values.length
  const zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0
  const start = val
  let next = val
  let i = values.indexOf(val)

  while (next === (values[i] || zeroVal)) {
    next--

    if (next < min) {
      next = max
    }

    i--
    if (i === -1) {
      i = len - 1
    }

    if (next === start) {
      return
    }
  }

  return next
}

module.exports = { arraySort, arrayNext, arrayNextInvalid, arrayPrev, arrayPrevInvalid }
