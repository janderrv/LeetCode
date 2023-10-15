var TimeLimitedCache = function () {
  const cache = {};

  this.getKey = function (key) {
    if (new Date().getTime() > cache[key]?.expiresAt) {
      delete cache[key];
    }
    return cache[key]?.value || -1;
  };

  this.exists = function (key) {
    return !!cache[key];
  };

  this.clear = function (key) {
    return clearInterval(cache[key].interval);
  };

  this.insert = function (key, value, duration) {
    cache[key] = {
      value,
      expiresAt: new Date().getTime() + duration,
    };
  };

  this.count = function () {
    let keysCount = 0;
    for (const key of Object.values(cache)) {
      keysCount += new Date().getTime() <= key?.expiresAt ? 1 : 0;
    }

    return keysCount;
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