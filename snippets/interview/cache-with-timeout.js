let TimeLimitedCache = function () {
  this.cache = new Map()
}

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  if (this.cache.has(key)) {
    const target = this.cache.get(key)
    const isExpired = this.isExpired(target.duration, target.prevTick)
    Object.assign(target, { value, duration, prevTick: Date.now() })
    return isExpired
  }

  const target = { value, duration, prevTick: Date.now() }
  this.cache.set(key, target)
  return false
}

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (!this.cache.has(key)) {
    return -1
  }

  const target = this.cache.get(key)
  if (this.isExpired(target.duration, target.prevTick)) {
    this.cache.delete(key)
    return -1
  }

  return target.value
}

TimeLimitedCache.prototype.isExpired = function (duration, prevTick, now) {
  now = now ?? Date.now()
  return now - prevTick >= duration
}

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let count = 0
  this.cache.forEach((target, key) => {
    if (this.isExpired(target.duration, target.prevTick)) {
      this.cache.delete(key)
    } else {
      count++
    }
  })
  return count
}
