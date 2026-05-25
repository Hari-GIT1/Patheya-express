const redis =
  require('../../config/redis');

class CacheService {

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

}

module.exports =
  new CacheService();