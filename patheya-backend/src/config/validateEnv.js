const requiredEnvs = [

  'PORT',

  'MONGO_URI',

  'JWT_SECRET',

  'CLIENT_URL',

  'PARTNER_URL',

  'ADMIN_URL'

];

requiredEnvs.forEach((env) => {

  if (!process.env[env]) {

    throw new Error(

      `Missing ENV variable: ${env}`

    );

  }

});