const {

    Worker
  
  } = require('bullmq');
  
  const connection =
    require('../../../config/redis');
  
  const worker =
    new Worker(
  
      'orders',
  
      async (job) => {
  
        console.log(
  
          'PROCESSING JOB:',
  
          job.name
  
        );
  
        // ======================
        // ORDER CREATED
        // ======================
  
        if (
  
          job.name ===
          'order-created'
  
        ) {
  
          console.log(
  
            'SEND EMAIL',
  
            job.data.orderId
  
          );
  
        }
  
        // ======================
        // ORDER DELIVERED
        // ======================
  
        if (
  
          job.name ===
          'order-delivered'
  
        ) {
  
          console.log(
  
            'SEND DELIVERY EMAIL',
  
            job.data.orderId
  
          );
  
        }
  
      },
  
      {
  
        connection
  
      }
  
    );
  
  module.exports =
    worker;