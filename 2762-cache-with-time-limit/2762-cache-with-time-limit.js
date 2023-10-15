var TimeLimitedCache = function () {
  const cache = new Map();

  this.getKey = function (key) {
    return cache.get(key)?.value || -1;
  };

  this.exists = function (key) {
    return !!cache.get(key);
  };

  this.insert = function (key, value, duration) {
    if (cache.get(key)) {
      clearTimeout(cache.get(key).timeout);
    }

    cache.set(key, {
      value,
      timeout: setTimeout(() => cache.delete(key), duration),
    });
  };

  this.count = function () {
    return cache.size;
  };
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const exists = this.exists(key);

  this.insert(key, value, duration);

  return exists;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  return this.getKey(key);
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return this.count();
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
