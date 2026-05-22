const socketChannel =
  require(
    '../notifications/socket.channel'
  );

const emailChannel =
  require(
    '../notifications/email.channel'
  );

class NotificationService {

  constructor() {

    this.io = null;

  }

  // ==========================
  // INITIALIZE SOCKET
  // ==========================

  setSocket(io) {

    this.io = io;

  }

  // ==========================
  // SOCKET NOTIFICATION
  // ==========================

  async sendSocketNotification({

    event,

    room,

    data

  }) {

    await socketChannel.send({

      io:
        this.io,

      event,

      room,

      data

    });

  }

  // ==========================
  // EMAIL NOTIFICATION
  // ==========================

  async sendEmailNotification({

    to,

    subject,

    message

  }) {

    await emailChannel.send({

      to,

      subject,

      message

    });

  }

  // ==========================
  // CENTRAL NOTIFY
  // ==========================

  async notify({

    socket,

    email

  }) {

    // ======================
    // SOCKET
    // ======================

    if (socket) {

      await this
        .sendSocketNotification(
          socket
        );

    }

    // ======================
    // EMAIL
    // ======================

    if (email) {

      await this
        .sendEmailNotification(
          email
        );

    }

  }

}

module.exports =
  new NotificationService();