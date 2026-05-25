const requiredEnv = [

    'PORT',
  
    'MONGO_URI',
  
    'JWT_SECRET',
  
    'REDIS_HOST',
  
    'REDIS_PORT',
  
    'RAZORPAY_KEY_ID',
  
    'RAZORPAY_KEY_SECRET'
  
  ];
  
  module.exports = () => {
  
    const missing = [];
  
    requiredEnv.forEach((env) => {
  
      if (!process.env[env]) {
  
        missing.push(env);
  
      }
  
    });
  
    if (missing.length > 0) {
  
      console.log(
  
        'MISSING ENV VARIABLES:',
  
        missing
  
      );
  
      process.exit(1);
  
    }
  
  };