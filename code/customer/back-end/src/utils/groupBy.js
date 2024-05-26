const groupBy = (values, keyFinder) => {
  return values.reduce((a, b) => {
    const key = typeof keyFinder === 'function' ? keyFinder(b) : b[keyFinder]

    if (!a[key]) {
      a[key] = [b]
    } else {
      a[key] = [...a[key], b]
    }

    return a
  }, {})
}

export { groupBy }
