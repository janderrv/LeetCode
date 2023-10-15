var TimeLimitedCache = function () {
  this.cache = {};
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const exists = !!this.cache[key];

  if(this.cache[key]){
    clearTimeout(this.cache[key].timeout)
  }

  this.cache[key] = {
    value,
    timeout: setTimeout(() => delete this.cache[key], duration),
  };

  return exists;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  return this.cache[key]?.value || -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return Object.keys(this.cache).length
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */