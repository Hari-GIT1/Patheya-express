const requiredEnv = [

    'MONGO_URI',
  
    'JWT_SECRET'
  
  ];
  
  requiredEnv.forEach((key) => {
  
    if (!process.env[key]) {
  
      throw new Error(
  
        `Missing env variable: ${key}`
  
      );
  
    }
  
  });