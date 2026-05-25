const { Worker } = require('bullmq');

const createRedisConnection =
  require('../config/redis');

const connection =
  createRedisConnection();

const worker =
  new Worker(

    'notifications',

    async (job) => {

      console.log(
        'Processing:',
        job.data
      );

    },

    {
      connection
    }

  );

worker.on('completed', (job) => {

  console.log(
    `✅ Job completed: ${job.id}`
  );

});

worker.on('failed', (job, err) => {

  console.log(
    `❌ Job failed: ${job.id}`
  );

});