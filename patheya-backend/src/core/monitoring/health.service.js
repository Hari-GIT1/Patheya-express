const mongoose =
  require('mongoose');

const redis =
  require('../../config/redis');

class HealthService {

  // ==========================
  // BASIC HEALTH
  // ==========================

  getBasicHealth() {

    return {

      status: 'ok',

      uptime:
        process.uptime(),

      timestamp:
        new Date(),

      environment:
        process.env.NODE_ENV

    };

  }

  // ==========================
  // DETAILED HEALTH
  // ==========================

  async getDetailedHealth() {

    // ========================
    // MONGODB
    // ========================

    const mongoState =
      mongoose.connection.readyState;

    const mongoStatus =

      mongoState === 1

        ? 'connected'

        : 'disconnected';

    // ========================
    // REDIS
    // ========================

    let redisStatus =
      'disconnected';

    try {

      await redis.ping();

      redisStatus =
        'connected';

    }

    catch (error) {

      redisStatus =
        'disconnected';

    }

    // ========================
    // MEMORY
    // ========================

    const memoryUsage =
      process.memoryUsage();

    // ========================
    // CPU
    // ========================

    const cpuUsage =
      process.cpuUsage();

    return {

      status: 'ok',

      environment:
        process.env.NODE_ENV,

      uptime:
        process.uptime(),

      timestamp:
        new Date(),

      services: {

        mongodb:
          mongoStatus,

        redis:
          redisStatus

      },

      memory: {

        rss:
          memoryUsage.rss,

        heapTotal:
          memoryUsage.heapTotal,

        heapUsed:
          memoryUsage.heapUsed

      },

      cpu: {

        user:
          cpuUsage.user,

        system:
          cpuUsage.system

      }

    };

  }

}

module.exports =
  new HealthService();