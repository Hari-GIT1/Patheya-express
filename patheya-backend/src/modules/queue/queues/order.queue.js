const {

    Queue
  
  } = require('bullmq');
  
  const connection =
    require('../../../config/redis');
  
  const orderQueue =
    new Queue(
  
      'orders',
  
      {
  
        connection
  
      }
  
    );
  
  module.exports =
    orderQueue;