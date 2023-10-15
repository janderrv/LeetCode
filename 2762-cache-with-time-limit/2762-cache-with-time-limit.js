var TimeLimitedCache = function () {
  const cache = {};

  this.getKey = function (key) {
    return cache[key]?.value || -1;
  };

  this.exists = function (key) {
    return !!cache[key];
  };

  this.insert = function (key, value, duration) {
    if(cache[key]){
      clearTimeout(cache[key].timeout)
    }
    cache[key] = {
      value,
      timeout: setTimeout(() => delete cache[key], duration),
    };
  };

  this.count = function () {
    return Object.keys(cache).length;
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
