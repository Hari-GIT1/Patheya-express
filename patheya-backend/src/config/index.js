module.exports = {

    nodeEnv:
      process.env.NODE_ENV,
  
    port:
      process.env.PORT,
  
    mongoUri:
      process.env.MONGO_URI,
  
    jwtSecret:
      process.env.JWT_SECRET,
  
    razorpay: {
  
      keyId:
        process.env.RAZORPAY_KEY_ID,
  
      keySecret:
        process.env.RAZORPAY_KEY_SECRET
  
    }
  
  };