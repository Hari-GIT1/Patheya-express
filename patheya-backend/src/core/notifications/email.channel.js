class EmailChannel {

    // ==========================
    // SEND EMAIL
    // ==========================
  
    async send({
  
      to,
  
      subject,
  
      message
  
    }) {
  
      try {
  
        // ======================
        // TEMP LOGGING
        // ======================
  
        console.log({
  
          type:
            'EMAIL_NOTIFICATION',
  
          to,
  
          subject,
  
          message
  
        });
  
        // ======================
        // FUTURE:
        // NODEMAILER / RESEND
        // ======================
  
      }
  
      catch (error) {
  
        console.log(error);
  
      }
  
    }
  
  }
  
  module.exports =
    new EmailChannel();