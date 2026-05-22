const bcrypt =
  require('bcryptjs');

// ==============================
// HASH PASSWORD
// ==============================

exports.hashPassword =
async (password) => {

  return await bcrypt.hash(

    password,

    10

  );

};

// ==============================
// COMPARE PASSWORD
// ==============================

exports.comparePassword =
async (

  password,

  hashedPassword

) => {

  return await bcrypt.compare(

    password,

    hashedPassword

  );

};