const redis =
  require('../../config/redis');

class CacheService {

  // ==============================
  // GET CACHE
  // ==============================
  async get(key) {

    try {

      const data =
        await redis.get(key);

      return data
        ? JSON.parse(data)
        : null;

    } catch (error) {

      console.error(

        'Cache GET Error:',

        error.message

      );

      return null;

    }

  }

  // ==============================
  // SET CACHE
  // ==============================
  async set(

    key,

    value,

    ttl = 3600

  ) {

    try {

      await redis.set(

        key,

        JSON.stringify(value),

        'EX',

        ttl

      );

    } catch (error) {

      console.error(

        'Cache SET Error:',

        error.message

      );

    }

  }

  // ==============================
  // DELETE CACHE
  // ==============================
  async del(key) {

    try {

      await redis.del(key);

    } catch (error) {

      console.error(

        'Cache DELETE Error:',

        error.message

      );

    }

  }

  // ==============================
  // DELETE BY PATTERN
  // ==============================
  async delByPattern(pattern) {

    try {

      const keys =
        await redis.keys(
          pattern
        );

      if (keys.length > 0) {

        await redis.del(...keys);

      }

    } catch (error) {

      console.error(

        'Cache Pattern Delete Error:',

        error.message

      );

    }

  }

}

module.exports =
  new CacheService();