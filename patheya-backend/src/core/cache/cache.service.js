const redis =
  require('../../config/redis');

class CacheService {

  // ==========================
  // GET
  // ==========================

  async get(key) {

    const data =
      await redis.get(key);

    return data

      ? JSON.parse(data)

      : null;

  }

  // ==========================
  // SET
  // ==========================

  async set(

    key,

    value,

    ttl = 3600

  ) {

    await redis.set(

      key,

      JSON.stringify(value),

      'EX',

      ttl

    );

  }

  // ==========================
  // DELETE
  // ==========================

  async del(key) {

    await redis.del(key);

  }

  // ==========================
  // DELETE BY PATTERN
  // ==========================

  async delByPattern(pattern) {

    const keys =
      await redis.keys(pattern);

    if (keys.length > 0) {

      await redis.del(...keys);

    }

  }

}

module.exports =
  new CacheService();