const modifier = {}

module.exports = modifier

/**
 * Creates a new modified constraint.
 *
 * @param {Constraint} constraint: The constraint to be modified
 * @param {Integer} value: The starting value of the before constraint
 */
modifier.before = modifier.b = function (constraint, values) {
  const value = values[values.length - 1]

  return {
    /**
     * Returns the name of the constraint with the 'before' modifier.
     */
    name: 'before ' + constraint.name,

    /**
     * Pass through to the constraint.
     */
    range: constraint.range * (value - 1),

    /**
     * The value of the specified date. Returns value for any constraint val
     * that is less than or equal to value.
     *
     * @param {Date} d: The date to calculate the value of
     */
    val: constraint.val,

    /**
     * Returns true if the val is valid for the date specified.
     *
     * @param {Date} d: The date to check the value on
     * @param {Integer} val: The value to validate
     */
    isValid: function (d, val) {
      return this.val(d) < value
    },

    /**
     * Pass through to the constraint.
     */
    extent: constraint.extent,

    /**
     * Pass through to the constraint.
     */
    start: constraint.start,

    /**
     * Jump to the end of the range.
     */
    end: constraint.end,

    /**
     * Pass through to the constraint.
     */
    next: function (startDate, val) {
      val = val === value ? constraint.extent(startDate)[0] : value
      return constraint.next(startDate, val)
    },

    /**
     * Pass through to the constraint.
     */
    prev: function (startDate, val) {
      val = val === value ? value - 1 : constraint.extent(startDate)[1]
      return constraint.prev(startDate, val)
    }
  }
}

/**
 * Creates a new modified constraint.
 *
 * @param {Constraint} constraint: The constraint to be modified
 * @param {Integer} value: The starting value of the after constraint
 */
modifier.after = modifier.a = function (constraint, values) {
  const value = values[0]

  return {
    /**
     * Returns the name of the constraint with the 'after' modifier.
     */
    name: 'after ' + constraint.name,

    /**
     * Pass through to the constraint.
     */
    range: (constraint.extent(new Date())[1] - value) * constraint.range,

    /**
     * The value of the specified date. Returns value for any constraint val
     * that is greater than or equal to value.
     *
     * @param {Date} d: The date to calculate the value of
     */
    val: constraint.val,

    /**
     * Returns true if the val is valid for the date specified.
     *
     * @param {Date} d: The date to check the value on
     * @param {Integer} val: The value to validate
     */
    isValid: function (d, val) {
      return this.val(d) >= value
    },

    /**
     * Pass through to the constraint.
     */
    extent: constraint.extent,

    /**
     * Pass through to the constraint.
     */
    start: constraint.start,

    /**
     * Pass through to the constraint.
     */
    end: constraint.end,

    /**
     * Pass through to the constraint.
     */
    next: function (startDate, val) {
      if (val !== value) val = constraint.extent(startDate)[0]
      return constraint.next(startDate, val)
    },

    /**
     * Pass through to the constraint.
     */
    prev: function (startDate, val) {
      val = val === value ? constraint.extent(startDate)[1] : value - 1
      return constraint.prev(startDate, val)
    }
  }
}
