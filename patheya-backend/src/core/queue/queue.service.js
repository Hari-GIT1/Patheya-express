const {

    Queue,
  
    Worker
  
  } = require('bullmq');

  
  // ==============================
  // QUEUE CONNECTION
  // ==============================
  
  const connection = {
  
    host:
      process.env.REDIS_HOST || '127.0.0.1',
  
    port:
      process.env.REDIS_PORT || 6379
  
  };
  
  // ==============================
  // QUEUE SERVICE
  // ==============================
  
  class QueueService {
  
    constructor() {
  
      this.queues = {};
  
    }
  
    // ==========================
    // GET QUEUE
    // ==========================
  
    getQueue(name) {
  
      if (!this.queues[name]) {
  
        this.queues[name] =
          new Queue(
  
            name,
  
            { connection }
  
          );
  
      }
  
      return this.queues[name];
  
    }
  
    // ==========================
    // ADD JOB
    // ==========================
  
    async addJob(
  
      queueName,
  
      data,
  
      options = {}
  
    ) {
  
      const queue =
        this.getQueue(
          queueName
        );
  
      return await queue.add(
  
        queueName,
  
        data,
  
        options
  
      );
  
    }
  
    // ==========================
    // PROCESS
    // ==========================
  
    process(
  
      queueName,
  
      processor
  
    ) {
  
      const worker =
      new Worker(
    
        queueName,
    
        processor,
    
        { connection }
    
      );
    
    worker.on(
    
      'completed',
    
      (job) => {
    
        console.log(
    
          `JOB COMPLETED: ${job.id}`
    
        );
    
      }
    
    );
    
    worker.on(
    
      'failed',
    
      (job, err) => {
    
        console.log(
    
          `JOB FAILED: ${job?.id}`,
    
          err.message
    
        );
    
      }
    
    );
  
      console.log(
  
        `QUEUE WORKER STARTED: ${queueName}`
  
      );
  
    }
  
  }
  
  module.exports =
    new QueueService();