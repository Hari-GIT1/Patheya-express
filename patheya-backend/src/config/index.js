module.exports = {

  nodeEnv:
    process.env.NODE_ENV,

  port:
    process.env.PORT,

  mongoUri:
    process.env.MONGO_URI,

  jwtSecret:
    process.env.JWT_SECRET,

  cloudinary: {

    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME,

    apiKey:
      process.env.CLOUDINARY_API_KEY,

    apiSecret:
      process.env.CLOUDINARY_API_SECRET

  },

  razorpay: {

    keyId:
      process.env.RAZORPAY_KEY_ID,

    keySecret:
      process.env.RAZORPAY_KEY_SECRET

  },

  urls: {

    customer:
      process.env.CLIENT_URL,

    partner:
      process.env.PARTNER_URL,

    admin:
      process.env.ADMIN_URL

  }

};