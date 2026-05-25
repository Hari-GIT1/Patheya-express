const Redis = require('ioredis');

const redis = new Redis({

  host: process.env.REDIS_HOST || '127.0.0.1',

  port: process.env.REDIS_PORT || 6379,

  maxRetriesPerRequest: null,

  retryStrategy(times) {

    return Math.min(
      times * 50,
      2000
    );

  }

});

redis.on('connect', () => {

  console.log(
    '✅ Redis Connected'
  );

});

redis.on('error', (err) => {

  console.error(
    '❌ Redis Error:',
    err.message
  );

});

redis.on('reconnecting', () => {

  console.log(
    '🔄 Redis Reconnecting...'
  );

});

module.exports = redis;